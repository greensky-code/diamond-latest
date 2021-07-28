/* Copyright (c) 2021 . All Rights Reserved. */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit, QueryList,
    ViewChild, ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, PcpAutoAssignDtl, PcpAutoAssignHdr, SecWin, SystemCodes} from '../../../api-models/index';
import {PcpAutoAssignHdrService} from '../../../api-services/support/pcp-auto-assign-hdr.service';
import {PcpAutoAssignDtlService} from '../../../api-services/support/pcp-auto-assign-dtl.service';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {
    LineOfBusinessMasterService,
    MessageMasterDtlService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {UntilDestroy} from '@ngneat/until-destroy';
import {CONSTANTS, getPcpAutoAssignShortcutKeys} from '../../../shared/services/shared.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {HelpComponent} from '../../member/help/help.component';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {LineOFBLookup} from '../../../shared/lookup/line-of-business-lookup';
import {PCP_AUTO_ASSIGN_MODULE_ID} from '../../../shared/app-constants';
import {SystemCodesLookup} from '../../../shared/lookup/system-codes-lookup';
import {LineOfBusinessMaster} from '../../../api-models/line-of-business-master.model';
import {PcpaaRulesHdr} from '../../../api-models/support/pcpaa-rules-hdr.model';
import {PcpaaRulesHdrService} from '../../../api-services/support/pcpaa-rules-hdr.service';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {DatePipe} from "@angular/common";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the PcpAutoAssignComponent as an Angular component
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

    selector: 'pcpautoassign',
    templateUrl: './pcp-auto-assign.component.html',
    providers: [
        PcpAutoAssignHdrService,
        PcpAutoAssignDtlService,
        PcpaaRulesHdrService
    ]
})
export class PcpAutoAssignComponent implements OnInit, AfterViewInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon: boolean;
    @Input() winId: string;
    pcpAutoAssignForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    secWin: SecWinViewModel;
    windowId = PCP_AUTO_ASSIGN_MODULE_ID;
    tableName = "PCP_AUTO_ASSIGN_HDR";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = PCP_AUTO_ASSIGN_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    @Input() winID?: string;
    public menu: Menu[] = [];
    searchStatus = false;
    keyNames = 'seq_pcp_auto_assign';
    keyValues: any;
    isDisabledField = false;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChild('lineOfBusinessField') lineOfBusinessElem: ElementRef;
    isChildModalOpen: boolean;
    pressedKey: any[] = [];
    @Input() lineOfBusinessId: string;

    lineOfBusiness: string;
    searchLineOfBusinessModel = new SearchModel(
        'linesofbusinessmaster/LOB/lookup',
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        []
    );
    lineOfBusinessStatus: Boolean = false;
    eventStatus: Boolean = false;

    eventSystemCode: number;
    eventType: string;
    searchEventModel = new SearchModel(
        'systemcodeses/find-by-systemCodeType/PCPAAEVENTDESCR/systemCodeActive/Y/languageId/0',
        SystemCodesLookup.SYSTEM_CODES_ALL,
        SystemCodesLookup.SYSTEM_CODES_DEFAULT,
        [],
        false,
        false,
        'get'
    );

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
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

    editPcpAutoAssignHdr: boolean;
    pcpAutoAssignHdr: PcpAutoAssignHdr;
    pcpAutoAssignHdrs: PcpAutoAssignHdr[];
    editPcpAutoAssignDtl: boolean;
    pcpAutoAssignDtl: PcpAutoAssignDtl;
    pcpAutoAssignDtls: PcpAutoAssignDtl[];

    createPcpAutoAssignHdr() {
        this.formValidation.validateForm();
        if (this.pcpAutoAssignForm.valid) {
            let pcpAutoAssignHdr = new PcpAutoAssignHdr();
            pcpAutoAssignHdr.lineOfBusiness = Form.getValue(this.pcpAutoAssignForm, 'lineOfBusiness');
            pcpAutoAssignHdr.eventType = Form.getValue(this.pcpAutoAssignForm, 'event');
            pcpAutoAssignHdr.membReinstThreshold = Form.getValue(this.pcpAutoAssignForm, 'memberReinstated001');
            pcpAutoAssignHdr.diamondIdDays = Form.getValue(this.pcpAutoAssignForm, 'diamondId001');
            pcpAutoAssignHdr.familyAfflFlag = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation001');
            pcpAutoAssignHdr.familyAfflOrder = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation002');
            this.pcpAutoAssignHdrService.createPcpAutoAssignHdr(pcpAutoAssignHdr).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editPcpAutoAssignHdr = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updatePcpAutoAssignHdr(seqPcpAutoAssgn : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.pcpAutoAssignForm.valid) {
            let pcpAutoAssignHdr = new PcpAutoAssignHdr();
            pcpAutoAssignHdr.lineOfBusiness = Form.getValue(this.pcpAutoAssignForm, 'lineOfBusiness');
            pcpAutoAssignHdr.eventType = Form.getValue(this.pcpAutoAssignForm, 'event');
            pcpAutoAssignHdr.membReinstThreshold = Form.getValue(this.pcpAutoAssignForm, 'memberReinstated001');
            pcpAutoAssignHdr.diamondIdDays = Form.getValue(this.pcpAutoAssignForm, 'diamondId001');
            pcpAutoAssignHdr.familyAfflFlag = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation001');
            pcpAutoAssignHdr.familyAfflOrder = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation002');
            this.pcpAutoAssignHdrService.updatePcpAutoAssignHdr(pcpAutoAssignHdr, seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPcpAutoAssignHdr = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }

    savePcpAutoAssignHdr() {
        if(this.editPcpAutoAssignHdr) {
            this.updatePcpAutoAssignHdr(this.pcpAutoAssignHdr.seqPcpAutoAssgn)
        } else {
            this.createPcpAutoAssignHdr();
        }
    }

    deletePcpAutoAssignHdr(seqPcpAutoAssgn : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpAutoAssignHdrService.deletePcpAutoAssignHdr(seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }

    getPcpAutoAssignHdr(seqPcpAutoAssgn : number) {
        this.pcpAutoAssignHdrService.getPcpAutoAssignHdr(seqPcpAutoAssgn).subscribe(pcpAutoAssignHdr => {
            this.pcpAutoAssignHdr = pcpAutoAssignHdr;
            this.pcpAutoAssignForm.patchValue({
                'lineOfBusiness': this.pcpAutoAssignHdr.lineOfBusiness,
                'event': this.pcpAutoAssignHdr.eventType,
                'diamondIdOverride': this.pcpAutoAssignHdr.membReinstThreshold,
                'requestedPcpEvaluate': this.pcpAutoAssignHdr.diamondIdDays,
                'diamondIdEvaluate': this.pcpAutoAssignHdr.familyAfflFlag,
                'familyAffiliationEvaluate': this.pcpAutoAssignHdr.familyAfflOrder,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getPcpAutoAssignHdrs() {
        this.pcpAutoAssignHdrService.getPcpAutoAssignHdrs().subscribe(pcpAutoAssignHdrs => {
        this.pcpAutoAssignHdrs = pcpAutoAssignHdrs;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    createPcpAutoAssignDtl() {
        this.formValidation.validateForm();
        if(this.pcpAutoAssignForm.valid) {
            let pcpAutoAssignDtl = new PcpAutoAssignDtl();
            this.pcpAutoAssignDtlService.createPcpAutoAssignDtl(pcpAutoAssignDtl).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editPcpAutoAssignDtl = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updatePcpAutoAssignDtl(seqPcpAutoAssgn : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.pcpAutoAssignForm.valid) {
            let pcpAutoAssignDtl = new PcpAutoAssignDtl();
            this.pcpAutoAssignDtlService.updatePcpAutoAssignDtl(pcpAutoAssignDtl, seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPcpAutoAssignDtl = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }

    savePcpAutoAssignDtl() {
        if(this.editPcpAutoAssignDtl) {
            this.updatePcpAutoAssignDtl(this.pcpAutoAssignDtl.pcpAutoAssignDtlPrimaryKey.seqPcpAutoAssgn)
        } else {
            this.createPcpAutoAssignDtl();
        }
    }

    deletePcpAutoAssignDtl(seqPcpAutoAssgn : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpAutoAssignDtlService.deletePcpAutoAssignDtl(seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }

    getPcpAutoAssignDtl(seqPcpAutoAssgn : number) {
        this.pcpAutoAssignDtlService.getPcpAutoAssignDtl(seqPcpAutoAssgn).subscribe(pcpAutoAssignDtl => {
            this.pcpAutoAssignDtl = pcpAutoAssignDtl;
            this.pcpAutoAssignForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getPcpAutoAssignDtls() {
        this.pcpAutoAssignDtlService.getPcpAutoAssignDtls().subscribe(pcpAutoAssignDtls => {
        this.pcpAutoAssignDtls = pcpAutoAssignDtls;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;

    createDataGrid(): void {
      this.dataGridGridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: "Rule ID" ,
             field: "ruleId",
             width: 200,
             headerClass: 'clr-blue'
         },
         {
             headerName: "Rule Type",
             field: "ruleType",
             width: 200         },
         {
             headerName: "Rule Descr",
             field: "ruleDescr",
             width: 200         },
         {
             headerName: "Proc Sequence",
             field: "procSequence",
             width: 200,
             headerClass: 'clr-blue'}
      ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private pcpAutoAssignHdrService: PcpAutoAssignHdrService,
        private pcpAutoAssignDtlService: PcpAutoAssignDtlService,
        private pcpaaRulesHdrService: PcpaaRulesHdrService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private systemCodesService: SystemCodesService
    ) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.pcpAutoAssignForm);
        this.createDataGrid();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getPcpAutoAssignShortcutKeys(this));
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

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
                this.secProgress = false;
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId(this.tableName, secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.pcpAutoAssignForm);
        this.createDataGrid();
        if (this.lineOfBusinessId) {
            this.setLineOfBusiness(this.lineOfBusinessId);
        }
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.pcpAutoAssignForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            lineOfBusinessDescription: ['', {updateOn: 'blur', validators: [] }],
            event: ['', {updateOn: 'blur', validators: [] }],
            requestedPcpOverride: ['', {updateOn: 'blur', validators: [] }],
            memberReinstatedOverride: ['', {updateOn: 'blur', validators: [] }],
            diamondIdOverride: ['', {updateOn: 'blur', validators: [] }],
            familyAffiliationOverride: ['', {updateOn: 'blur', validators: [] }],
            requestedPcpEvaluate: ['', {updateOn: 'blur', validators: [] }],
            requestedPcpEvaluateOrder: ['', {updateOn: 'blur', validators: [] }],
            memberReinstatedEvaluate: ['', {updateOn: 'blur', validators: [] }],
            memberReinstatedEvaluateOrder: ['', {updateOn: 'blur', validators: [] }],
            memberReinstatedEvaluateDays: ['', {updateOn: 'blur', validators: [] }],
            diamondIdEvaluate: ['', {updateOn: 'blur', validators: [] }],
            diamondIdEvaluateOrder: ['', {updateOn: 'blur', validators: [] }],
            diamondIdEvaluateDays: ['', {updateOn: 'blur', validators: [] }],
            familyAffiliationEvaluate: ['', {updateOn: 'blur', validators: [] }],
            familyAffiliationEvaluateOrder: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    isTrue(booleanYN: string){
        return booleanYN === 'Y' ? true : false;
    }

    populateForm() {
        this.pcpAutoAssignForm.patchValue({
            requestedPcpOverride: this.isTrue(this.pcpAutoAssignHdr.reqPcpThreshold),
            memberReinstatedOverride: this.isTrue(this.pcpAutoAssignHdr.membReinstThreshold),
            diamondIdOverride: this.isTrue(this.pcpAutoAssignHdr.diamondIdThreshold),
            familyAffiliationOverride: this.isTrue(this.pcpAutoAssignHdr.familyAfflThreshold),
            requestedPcpEvaluate: this.isTrue(this.pcpAutoAssignHdr.reqPcpFlag),
            requestedPcpEvaluateOrder: this.pcpAutoAssignHdr.reqPcpOrder,
            memberReinstatedEvaluate: this.isTrue(this.pcpAutoAssignHdr.membReinstFlag),
            memberReinstatedEvaluateOrder: this.pcpAutoAssignHdr.membReinstOrder,
            memberReinstatedEvaluateDays: this.pcpAutoAssignHdr.membReinstDays,
            diamondIdEvaluate: this.isTrue(this.pcpAutoAssignHdr.diamondIdFlag),
            diamondIdEvaluateOrder: this.pcpAutoAssignHdr.diamondIdOrder,
            diamondIdEvaluateDays: this.pcpAutoAssignHdr.diamondIdDays,
            familyAffiliationEvaluate: this.isTrue(this.pcpAutoAssignHdr.familyAfflFlag),
            familyAffiliationEvaluateOrder: this.pcpAutoAssignHdr.familyAfflOrder
        });
    }

    resetForm() {
        this.pcpAutoAssignForm.patchValue({
            requestedPcpOverride: '',
            memberReinstatedOverride: '',
            diamondIdOverride: '',
            familyAffiliationOverride: this.isTrue(this.pcpAutoAssignHdr.familyAfflThreshold),
            requestedPcpEvaluate: this.isTrue(this.pcpAutoAssignHdr.reqPcpFlag),
            requestedPcpEvaluateOrder: this.pcpAutoAssignHdr.reqPcpOrder,
            memberReinstatedEvaluate: this.isTrue(this.pcpAutoAssignHdr.membReinstFlag),
            memberReinstatedEvaluateOrder: this.pcpAutoAssignHdr.membReinstOrder,
            memberReinstatedEvaluateDays: this.pcpAutoAssignHdr.membReinstDays,
            diamondIdEvaluate: this.isTrue(this.pcpAutoAssignHdr.diamondIdFlag),
            diamondIdEvaluateOrder: this.pcpAutoAssignHdr.diamondIdOrder,
            diamondIdEvaluateDays: this.pcpAutoAssignHdr.diamondIdDays,
            familyAffiliationEvaluate: this.isTrue(this.pcpAutoAssignHdr.familyAfflFlag),
            familyAffiliationEvaluateOrder: this.pcpAutoAssignHdr.familyAfflOrder
        });
    }

    private handleNotesMenu(action: string) {
        switch (action) {
            case "Notes": {
                this.popUpNotesMenuClicked(action);
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    /**
     * Help Menu actions
     * @param action
     */
    handleHelpMenu(action: string) {
        const modalRef = this.modalService.open(HelpComponent, { windowClass: "myCustomModalClass" });

        switch (action) {
            case "This Window": {
                modalRef.componentInstance.currentWin = 'SUPPORT_Pcp_Auto_Assign.htm';
                break;
            }
            default: {
                break;
            }
        }
    }

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    setLineOfBusiness(lineOfBusiness: string) {
        this.lineOfBusiness = lineOfBusiness.toUpperCase();
        if(this.lineOfBusiness){
            this.pcpAutoAssignForm.patchValue({
                'lineOfBusiness': this.lineOfBusiness
            });
            this.lineOfBusinessStatus = true;
            this.pcpAutoAssignForm.get('lineOfBusiness').disable();

            this.lineOfBusinessMasterService.getLineOfBusinessMaster(this.lineOfBusiness).subscribe(lineOfBusinessMaster => {
                this.pcpAutoAssignForm.patchValue({
                    'lineOfBusinessDescription': lineOfBusinessMaster.description
                });
            });
            this.getRule();
        }
    }

    onChangeLineOfBusiness(event: any) {
        this.setLineOfBusiness(event.target.value);
    }

    openLineOfBusinessLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchLineOfBusinessModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((response: LineOfBusinessMaster) => {
            this.setLineOfBusiness(response.lineOfBusiness);
            this.isDisabledField = true;
        })
    }

    setEventSystemCode(eventSystemCode: any) {
        this.eventSystemCode = eventSystemCode;
        if(this.eventSystemCode){
            this.systemCodesService.findBySystemCodeAndSystemCodeTypeAndSystemCodeActiveAndLanguageId(this.eventSystemCode, 'PCPAAEVENTDESCR', 'Y', 0).subscribe(systemCode => {
                this.eventType = systemCode[0].systemCodeDesc2
                this.pcpAutoAssignForm.patchValue({
                    'event': this.eventType
                });
                this.eventStatus = true;
                this.pcpAutoAssignForm.get('event').disable();
                this.getRule();
            });
        }
    }

    onChangeEventSystemCode(event: any){
        this.setEventSystemCode(event.target.value);
    }

    openEventLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchEventModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((response: SystemCodes) => {
            this.setEventSystemCode(response.systemCodesPrimaryKey.systemCode);
        })
    }

    gridDataList = [];
    getRule() {
        if(this.lineOfBusiness && this.eventType){
            this.pcpAutoAssignHdrService.findByLineOfBusinessAndEventType(this.lineOfBusiness, this.eventSystemCode).subscribe((pcpAutoAssignHdrs: PcpAutoAssignHdr[]) => {
                this.pcpAutoAssignHdrs = pcpAutoAssignHdrs
                this.gridDataList = [];
                this.pcpAutoAssignForm.reset({
                    lineOfBusiness: Form.getValue(this.pcpAutoAssignForm, 'lineOfBusiness'),
                    lineOfBusinessDescription: Form.getValue(this.pcpAutoAssignForm, 'lineOfBusinessDescription'),
                    event: Form.getValue(this.pcpAutoAssignForm, 'event')
                });
                this.pcpAutoAssignHdrs.map(pcpAutoAssignHdr => {
                        this.pcpAutoAssignHdr = pcpAutoAssignHdr;
                        this.searchStatus = true;
                        this.keyValues = this.pcpAutoAssignHdr.seqPcpAutoAssgn;
                        this.populateForm();
                        setTimeout(() => {
                            try {
                                this.pcpAutoAssignHdr.updateDatetimeDisplay = this.datePipe.transform(
                                    new Date(pcpAutoAssignHdr.updateDatetime),
                                    "yyyy-MM-dd HH:mm:ss"
                                );
                                this.pcpAutoAssignHdr.insertDatetimeDisplay = this.datePipe.transform(
                                    new Date(pcpAutoAssignHdr.insertDatetime),
                                    "yyyy-MM-dd HH:mm:ss"
                                );
                            } catch (e) {
                                console.log(e);
                            }
                        }, 500);
                        return pcpAutoAssignHdr.seqPcpAutoAssgn;
                    })
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .forEach(uniqueSeqPcpAutoAssgn => {
                        this.pcpAutoAssignDtlService.findByRuleAndPcpAutoAssignHdr(uniqueSeqPcpAutoAssgn).subscribe((pcpAutoAssignDtls: PcpAutoAssignDtl[]) => {
                            this.pcpAutoAssignDtls = pcpAutoAssignDtls;
                            this.pcpAutoAssignDtls.map((pcpAutoAssignDtl: PcpAutoAssignDtl) => {
                                let gridData = {};
                                gridData['procSequence'] = pcpAutoAssignDtl.procSequence;
                                this.pcpaaRulesHdrService.getPcpaaRulesHdr(pcpAutoAssignDtl.pcpAutoAssignDtlPrimaryKey.ruleId).subscribe((pcpaaRulesHdr: PcpaaRulesHdr) => {
                                    gridData['ruleId'] = pcpaaRulesHdr.ruleId;
                                    gridData['ruleType'] = pcpaaRulesHdr.ruleType;
                                    gridData['ruleDescr'] = pcpaaRulesHdr.ruleDescr;
                                    gridData['seqPcpAutoAssgn'] = pcpAutoAssignDtl.pcpAutoAssignDtlPrimaryKey.seqPcpAutoAssgn;
                                    this.gridDataList.push(gridData);
                                    this.dataGridGridOptions.api.setRowData(this.gridDataList);
                                });
                            })
                        });
                    });
            });
        }
    }

    onRuleSelected(event) {
        if(event && event.data){
            this.pcpAutoAssignHdr = this.pcpAutoAssignHdrs.find(value => value.seqPcpAutoAssgn === event.data.seqPcpAutoAssgn);
            this.populateForm();
        }
    }

    isEventType1() {
        return this.eventSystemCode && this.eventSystemCode == 1;
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl + N' },
                    { name: 'Open', shortcutKey: 'Ctrl + O' },
                    { name: 'Delete', shortcutKey: 'Ctrl + D' },
                    { name: 'Save', shortcutKey: 'Ctrl + S' },
                    { name: 'Close', shortcutKey: 'Ctrl + A4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt + A4' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true, shortcutKey: 'Ctrl + Z' },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true, shortcutKey: 'Ctrl + X' },
                    { name: 'Copy', disabled: true, shortcutKey: 'Ctrl + C' },
                    { name: 'Paste', disabled: true, shortcutKey: 'Ctrl + V' },
                    { isHorizontal: true },
                    { name: 'Lookup', shortcutKey: 'F5' },
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Line of Business', disabled: true },
                    { name: 'Auto Letter Setup', disabled: true },
                    { name: 'PCP Support Info Details', disabled: true },
                    { name: 'PCP Auto Assign', disabled: true },
                    { name: 'Claims Interest/ Penalty Calc Rules', disabled: true },
                    { name: 'Claims Discount Calculation Rules', disabled: true },
                    { name: 'Pre Existing Condition Rules', disabled: true },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S' },
                    { name: 'Audit Display', shortcutKey: 'Shift + Alt + A' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 PCP Auto Assign' },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window', shortcutKey: 'F1' },
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.isDisabledField = false;
                    this.pcpAutoAssignForm.reset();
                    break;
                }
                case 'Open': {
                    this.handleOpenMenu();
                    break;
                }
                case 'Save': {
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Exit': {
                    this.exitScreen();
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
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Notes') {
            this.handleNotesMenu(event.action);
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Show Timestamp': {
                    if (this.pcpAutoAssignForm.get('lineOfBusiness').value) {
                        this.openShowTimestampComponent();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }

                    break;
                }
                case 'Audit Display': {
                    this.openAuditDisplayComponent();
                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                this.openLineOfBusinessLookupPage();
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

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/PCPAA_PCP_Auto_Assign.htm';
    }

    handleOpenMenu() {
        this.lineOfBusinessStatus = false;
        this.eventStatus = false;
        this.isDisabledField = false;
        this.pcpAutoAssignForm.reset();
        this.pcpAutoAssignForm.get('lineOfBusiness').enable();
        this.pcpAutoAssignForm.get('event').enable();
        this.lineOfBusinessElem.nativeElement.focus();
    }

    openAuditDisplayComponent() {
        if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
                CONSTANTS.F_AUDIT,
                this.winID
            );
            if (status) {
                let ref = this.modalService.open(AuditDisplayComponent, {
                    size: 'lg',
                });
                ref.componentInstance.keyNames = this.keyNames;
                ref.componentInstance.keyValues = this.keyValues;
                ref.componentInstance.winID = this.winID;
                ref.componentInstance.win = 'dw_pcpaa_hdr_de';
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService
                    .findByMessageId(11073)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.toastService.showToast('11073: ' + message[0].messageText, NgbToastType.Danger);
                    });
            }
        } else {
            this.messageService
                .findByMessageId(30164)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.toastService.showToast('30164: ' + message[0].messageText, NgbToastType.Danger);
                });
        }
    }

    openFunctionalGroupShortcut() {
        const ref = this.modalService.open(FunctionalGroupShortCutComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openShowTimestampComponent() {
        const ref = this.modalService.open(TimestampComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.insertDateTime = this.pcpAutoAssignHdr.insertDatetime;
        ref.componentInstance.insertDateTime = this.pcpAutoAssignHdr.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.pcpAutoAssignHdr.insertProcess;
        ref.componentInstance.insertUser = this.pcpAutoAssignHdr.insertUser;
        ref.componentInstance.updateUser = this.pcpAutoAssignHdr.updateUser;
        ref.componentInstance.updateDateTime = this.pcpAutoAssignHdr.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.pcpAutoAssignHdr.updateProcess;
    }

    modalClose() {
        this.activeModal.close();
    }

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
                    sessionStorage.clear();
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

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    triggerMenus(value) {
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
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Delete'
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

    handleTopicMenu(event) {

    }
}
