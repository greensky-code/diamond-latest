/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecurityService} from '../../../shared/services/security.service';
import {Form} from '../../../shared/helpers/form.helper';
import {ToothHistory} from '../../../api-models/tooth-history.model';
import {GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToothHistoryService} from '../../../api-services/tooth-history.service';
import {DatePipe} from '@angular/common';
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {BenefitPackageMasterService, SecUserService, SystemCodesService} from '../../../api-services';
import {TOOTH_HISTORY_MODULE_ID} from '../../../shared/app-constants';
import {Menu, SearchModel} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {
    DEFAULT_LANGUAGE, SYSTEM_CODE_DNCLMARCH, SYSTEM_CODE_DNCLMORALCAV, SYSTEM_CODE_DNCLMQUADRANT,
    SYSTEM_CODE_DNCLMSURFACE, SYSTEM_CODE_DNCLMTOOTH, SYSTEM_CODE_DNCLMTOOTHSTAT,
} from '../../../shared/models/constants';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {LookupComponent} from '../../../shared/components/lookup/lookup.component';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {
    getClaimHoldReleaseRuleShortcutKeys,
    getToothHistoryShortcutKeys
} from "../../../shared/services/shared.service";

// Use the Component directive to define the ThistToothHistoryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'thisttoothhistory',
    templateUrl: './thist-tooth-history.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        UserDefinedValidateCodeService,
        FunctionalLevelSecurityService,
        ToothHistoryService
    ]
})
export class ThistToothHistoryComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    thistToothHistoryForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: 'THIST';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    public dataGridGridOptions: GridOptions;
    public isSubscriberDisabled = false;
    public showToothHistoryField: boolean;
    memberModuleId = TOOTH_HISTORY_MODULE_ID;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    editToothHistory: boolean;
    toothHistory: ToothHistory;
    toothHistories: ToothHistory[];
    surfaces: any[] = [];
    arches: any[] = [];
    quadrants: any[] = [];
    oralCavities: any[] = [];
    toothStatuses: any[] = [];
    toothNumbers: any[] = [];
    benPackages: any[] = [];
    diamondId: any;
    memberId: any;
    provider: any;
    personNumber: any;
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    // Use constructor injection to inject an instance of a FormBuilder

    searchModel = new SearchModel(
        'membermasters/lookup',
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );
    shortcuts: ShortcutInput[] = [];
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private toothHistoryService: ToothHistoryService,
        private memberMasterService: MemberMasterService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private systemCodesService: SystemCodesService,
        private benefitPackageMasterService: BenefitPackageMasterService) {
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
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
            }
        }, error => {
            this.secProgress = false;

        });
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('TOOTH_HISTORY', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.thistToothHistoryForm);
        this.createDataGrid();
        this.getSurface();
        this.getArches();
        this.getQuadrants();
        this.getOralClavities();
        this.getToothStatuses();
        this.getToothNumbers();
        this.getBenefitPackages();
        this.menuInit();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        }, 100);
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;

                }
                case 'Open': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Save': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Close': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions
            this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        }  else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Open' },
                    { name: 'Save' },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true },
                    { name: 'Copy', disabled: true },
                    { name: 'Paste', disabled: true },
                    { isHorizontal: true },
                    { name: 'Lookup' },
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Member Lookup' },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window' },
                    { isHorizontal: true },
                    { name: 'Glossary' },
                    { name: 'Getting Started' },
                    { name: 'How to use Help' },
                    { isHorizontal: true },
                    { name: 'About Diamond Client/Server' },
                ],
            },
        ];
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                this.openLookupFieldSearchModel();
            }
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Member Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }


    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
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

    popUpButtonHandler(button) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    getBenefitPackages() {
        this.benefitPackageMasterService.getBenefitPackageMasters().subscribe(packages => {
            this.benPackages = packages;
        });
    }

    getSurface() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMSURFACE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.surfaces = systemCodes;
        });
    }

    getArches() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMARCH, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.arches = systemCodes;
        });
    }

    getQuadrants() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMQUADRANT, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.quadrants = systemCodes;
        });
    }

    getOralClavities() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMORALCAV, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.oralCavities = systemCodes;
        });
    }

    getToothStatuses() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMTOOTHSTAT, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.toothStatuses = systemCodes;
        });
    }

    getToothNumbers() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMTOOTH, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.toothNumbers = systemCodes;
        });
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.getToothHistoryByMemberId(res.seqMembId);
            this.thistToothHistoryForm.patchValue({
                'diamondId': res.diamondId,
                'memberId': res.subscriberId,
                'personNo': res.personNumber
            });
            this.isSubscriberDisabled = true;
            this.popUpMessage = null;
        });
    }

    getToothHistoryByMemberId(seqMembId: number) {
        this.toothHistoryService.findBySeqMembId(seqMembId).subscribe(
            (toothHistories) => {
                if (toothHistories) {
                    this.dataGridGridOptions.api.setRowData(toothHistories);
                    this.toothHistories = toothHistories;
                    this.popUpMessage = null;
                } else {
                    this.toastService.showToast('Tooth History Not Found', NgbToastType.Danger);
                }
            },
            (error) => {
                console.log('error');
            }
        );
    }

    getToothHistoryBySubscriberIdAndPersonNumber(personNumber: string) {
        let memberId = Form.getValue(this.thistToothHistoryForm, 'memberId');
        this.isSubscriberDisabled = true;
        this.memberMasterService.findBySubscriberIdAndPersonNumber(memberId, personNumber).subscribe(
            (member) => {
                if (member) {
                   this.getToothHistoryByMemberId(member[0].seqMembId)
                } else {
                   this.toastService.showToast('Member not found', NgbToastType.Danger);
                }
            },
            (error) => {
                console.log('error');
            }
        );
    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        this.showToothHistoryField = true;
        this.getToothHistory(event.data);
    }

    onLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
           this.openLookupFieldSearchModel();
        }
    }

    onFieldChange(event, id) {
         if (event.key === 'Tab') {
            this.getToothHistoryBySubscriberIdAndPersonNumber(id);
        }
    }

    createToothHistory() {
        this.formValidation.validateForm();
        if (this.thistToothHistoryForm.valid) {
            let toothHistory = new ToothHistory();
            toothHistory.dateOfService = Form.getValue(this.thistToothHistoryForm, 'dateOfServices');
            toothHistory.toothNumber = Form.getValue(this.thistToothHistoryForm, 'toothNumber');
            toothHistory.procedureCode = Form.getValue(this.thistToothHistoryForm, 'procedure');
            toothHistory.seqProvId = Form.getValue(this.thistToothHistoryForm, 'provider');
            toothHistory.benefitPackageId = Form.getValue(this.thistToothHistoryForm, 'benefitPackage');
            toothHistory.quadrant = Form.getValue(this.thistToothHistoryForm, 'quadrant');
            toothHistory.oralCavity = Form.getValue(this.thistToothHistoryForm, 'oralCavity');
            toothHistory.toothStatus = Form.getValue(this.thistToothHistoryForm, 'toothStatus');
            toothHistory.userDefined1 = Form.getValue(this.thistToothHistoryForm, 'userDefined1');
            toothHistory.userDate1 = Form.getValue(this.thistToothHistoryForm, 'userDate1');
            toothHistory.userDefined2 = Form.getValue(this.thistToothHistoryForm, 'userDefined2');
            toothHistory.userDate2 = Form.getValue(this.thistToothHistoryForm, 'userDate2');
            this.toothHistoryService.createToothHistory(toothHistory).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editToothHistory = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateToothHistory(seqToothHistoryId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.thistToothHistoryForm.valid) {
                let toothHistory = new ToothHistory();
                toothHistory.dateOfService = Form.getValue(this.thistToothHistoryForm, 'dateOfServices');
                toothHistory.toothNumber = Form.getValue(this.thistToothHistoryForm, 'toothNumber');
                toothHistory.procedureCode = Form.getValue(this.thistToothHistoryForm, 'procedure');
                toothHistory.seqProvId = Form.getValue(this.thistToothHistoryForm, 'provider');
                toothHistory.benefitPackageId = Form.getValue(this.thistToothHistoryForm, 'benefitPackage');
                toothHistory.quadrant = Form.getValue(this.thistToothHistoryForm, 'quadrant');
                toothHistory.oralCavity = Form.getValue(this.thistToothHistoryForm, 'oralCavity');
                toothHistory.toothStatus = Form.getValue(this.thistToothHistoryForm, 'toothStatus');
                toothHistory.userDefined1 = Form.getValue(this.thistToothHistoryForm, 'userDefined1');
                toothHistory.userDate1 = Form.getValue(this.thistToothHistoryForm, 'userDate1');
                toothHistory.userDefined2 = Form.getValue(this.thistToothHistoryForm, 'userDefined2');
                toothHistory.userDate2 = Form.getValue(this.thistToothHistoryForm, 'userDate2');
                this.toothHistoryService.updateToothHistory(toothHistory, seqToothHistoryId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editToothHistory = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveToothHistory() {
        if (this.editToothHistory) {
            this.updateToothHistory(this.toothHistory.seqToothHistoryId)
        } else {
            this.createToothHistory();
        }
    }

    deleteToothHistory(seqToothHistoryId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.toothHistoryService.deleteToothHistory(seqToothHistoryId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getToothHistory(toothHistory: ToothHistory) {
           this.toothHistory = toothHistory;
            this.thistToothHistoryForm.patchValue({
                'dateOfServices': this.toothHistory.dateOfService,
                'toothNumber': this.toothHistory.toothNumber,
                'procedure': this.toothHistory.procedureCode,
                'provider': this.toothHistory.providerId,
                'benefitPackage': this.toothHistory.benefitPackageId,
                's1': this.toothHistory.surface1,
                's2': this.toothHistory.surface2,
                's3': this.toothHistory.surface3,
                's4': this.toothHistory.surface4,
                's5': this.toothHistory.surface5,
                'arch': this.toothHistory.arch,
                'quadrant': this.toothHistory.quadrant,
                'oralCavity': this.toothHistory.oralCavity,
                'toothStatus': this.toothHistory.toothStatus,
                'mefDef': this.toothHistory.medDefCode,
                'sourceType': this.toothHistory.sourceType,
                'claimNo': this.toothHistory.lineNumber,
                'userDefined1': this.toothHistory.userDefined1,
                'userDate1': this.toothHistory.userDate1,
                'userDefined2': this.toothHistory.userDefined2,
                'userDate2': this.toothHistory.userDate2,
            });
    }

    getToothHistorys() {
        this.toothHistoryService.getToothHistorys().subscribe(toothHistorys => {
            this.toothHistories = toothHistorys;
        });
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'T#',
                field: 'toothNumber',
                width: 100,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'S1',
                field: 'surface1',
                width: 100
            },
            {
                headerName: 'S2',
                field: 'surface2',
                width: 100
            },
            {
                headerName: 'S3',
                field: 'surface3',
                width: 100
            },
            {
                headerName: 'S4',
                field: 'surface4',
                width: 100
            },
            {
                headerName: 'S5',
                field: 'surface5',
                width: 100
            },
            {
                headerName: 'Arch',
                field: 'arch',
                width: 100
            },
            {
                headerName: 'Quad',
                field: 'quadrant',
                width: 100
            },
            {
                headerName: 'O Cav',
                field: 'oralCavity',
                width: 100
            },
            {
                headerName: 'DOS',
                field: 'dateOfService',
                width: 100
            },
            {
                headerName: 'Proc',
                field: 'procedureCode',
                width: 100
            },
            {
                headerName: 'Clm Num',
                field: 'lineNumber',
                width: 100
            },
            {
                headerName: 'Line No/Sub Line',
                field: 'linenumber',
                width: 100
            }
        ];
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.thistToothHistoryForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: []}],
            memberId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            personNo: ['', {updateOn: 'blur', validators: [Validators.required, Validators.maxLength(2)]}],
            dateOfServices: ['', {updateOn: 'blur', validators: []}],
            toothNumber: ['', {updateOn: 'blur', validators: []}],
            procedure: ['', {updateOn: 'blur', validators: []}],
            s1: ['', {updateOn: 'blur', validators: []}],
            provider: ['', {updateOn: 'blur', validators: []}],
            s2: ['', {updateOn: 'blur', validators: []}],
            arch: ['', {updateOn: 'blur', validators: []}],
            benefitPackage: ['', {updateOn: 'blur', validators: []}],
            s3: ['', {updateOn: 'blur', validators: []}],
            quadrant: ['', {updateOn: 'blur', validators: []}],
            s4: ['', {updateOn: 'blur', validators: []}],
            oralCavity: ['', {updateOn: 'blur', validators: []}],
            s5: ['', {updateOn: 'blur', validators: []}],
            toothStatus: ['', {updateOn: 'blur', validators: []}],
            mefDef: ['', {updateOn: 'blur', validators: []}],
            claimNo: ['', {updateOn: 'blur', validators: []}],
            lineNo: ['', {updateOn: 'blur', validators: []}],
            sourceType: ['', {updateOn: 'blur', validators: []}],
            userDefined1: ['', {updateOn: 'blur', validators: []}],
            userDate1: ['', {updateOn: 'blur', validators: []}],
            userDefined2: ['', {updateOn: 'blur', validators: []}],
            userDate2: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getToothHistoryShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/THIST_Tooth_History.htm'
    }
}
