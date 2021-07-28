//****************************************************************
//* Copyright © 2020, 2021, ResQSoft, Inc. All rights reserved.
//* This Program (which includes both the software and documentation) contains proprietary information;
//* it is provided under a license agreement containing restrictions on use and disclosure and is also
//* protected by copyright, patent, and other intellectual and industrial property laws. Reverse engineering,
//* disassembly, or decompilation of the Program, except to the extent required to obtain interoperability
//* with other independently created software or as specified by law, is prohibited. Transfer of rights regarding
//* this Program or any copy thereof is only valid pursuant to the terms of the ResQSoft license agreement,
//* available at https://www.resqsoft.com/resqsoft-software-license.html.
//****************************************************************

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Constants, GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { DatePickerConfig } from '../../../shared/config';
import { CONSTANTS, getBenefitPackgaeShortcutKeys, SharedService } from '../../../shared/services/shared.service';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import {
    BenefitPackageDetailService,
    BenefitPackageMasterService,
    BenefProcessOrderDetailService,
    BenefProcessOrderMasterService,
    DddwDtlService,
    MessageMasterDtlService
} from '../../../api-services';
import {
    BenefitPackageDetail,
    BenefitPackageMaster,
    BenefProcessOrderDetail,
    BenefProcessOrderMaster,
    DddwDtl,
    SecUser,
    SecWin,
    SystemCodes
} from '../../../api-models';
import { Menu, OPERATIONS, SearchModel } from '../../../shared/models/models';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemCodesService } from '../../../api-services/system-codes.service';
import { DEFAULT_LANGUAGE, SYSTEM_CODE_APL_PAT_LIB, SYSTEM_CODE_COPAY_LIB } from '../../../shared/models/constants';
import { BenefitRuleService } from '../../../api-services/benefit-rule.service';
import { BenefitRule } from '../../../api-models/benefit-rule.model';
import { CopyBenefitPackageComponent } from '../copy-benefit-package/copy-benefit-package.component';
import { DefineBenefitValueFiltersComponent } from '../define-benefit-value-filters/define-benefit-value-filters.component';
import { BenefitPackageUserFieldsComponent } from '../benefit-package-user-fields/benefit-package-user-fields.component';
import { MessageMasterDtl } from '../../../../../src/app/api-models';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { BenefitsHelpComponent } from '../benefits-help/benefits-help.component';
import { TimestampComponent } from '../../../shared/components/timestamp/timestamp.component';
import { MessageType } from '../../../shared/components/confirmation-message/confirmation.message.model';
import { Router } from '@angular/router';
import { UserDefinedValidateCodeService } from '../../../api-services/user-defined-validate-code.service';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { BenefitPackageMasterLookup } from '../../../shared/lookup/benefit-package-master-lookup';
import { DynamicUserDefinedFieldsComponent } from '../../../shared/components/dynamic-user-defined-fields/dynamic-user-defined-fields.component';
import { MenuService } from '../../../shared/services/menu.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuBarComponent } from '../../../shared/components/menu-bar/menu-bar.component';
import { AuditService } from "../../../shared/services/audit.service";


// Use the Component directive to define the BenefitPackageComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'benefitpackage',
    templateUrl: './benefit-package.component.html',
})
export class BenefitPackageComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    benefitPackageForm: FormGroup;
    benefitPackageDetailForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    @Input() showIcon = false;
    @Input() winID?: string;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    public datePickerConfig = DatePickerConfig;
    public benefitPackageId: any;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    editBenefitPackageMaster: boolean;
    benefitPackageMaster: BenefitPackageMaster;
    benefitPackage: BenefitPackageMaster;
    copyBenefitPackageMasters: any;
    benefitPackageMasters: BenefitPackageMaster[] = [];
    benefitPackageMastersTemp: BenefitPackageMaster[] = [];

    benefitPackageMastersOrderByProcessId: BenefProcessOrderMaster[];

    editBenefitPackageDetail: boolean;
    benefitPackageDetail: BenefitPackageDetail;
    benefitPackageDetails: BenefitPackageDetail[] = [];
    benefitPackageDetailsTemp: BenefitPackageDetail[];
    menu: Menu[] = [];
    benefitShortDesc: any;
    benefitrule: any;
    systemCodes: SystemCodes[];
    copayRestrictions: SystemCodes[];
    benefitRules: BenefitRule[];
    benefProcessOrderMasters: BenefProcessOrderMaster[];
    count = 0;
    processingOrderId: any;
    processingOrderIdDescription: string;
    seqProcessingOrderId: any;
    editFlagStatus = false;
    benefitPackageEditFlagStatus = false;
    dddwDtls: DddwDtl[] = [];
    dddwDtls1: DddwDtl[] = [];
    gridSelectionStatus = true;
    adjustForOcPdStatus = false;
    adjustforOCPdFlag = 'N';

    benefitPackageDetailId: any;
    benefitPackageDetailSeqId: any;
    benefitPackageDetailSequnceId: any;
    // Use constructor injection to inject an instance of a FormBuilder

    isReadOnly = true;
    searchStatus = false;
    keyNames = 'dw_benef_de';
    keyValues: any;
    noParentAllowedMessage: MessageMasterDtl[];
    benefProcessOrderDetails: BenefProcessOrderDetail[];
    benefProcessOrderDetail: BenefProcessOrderDetail;
    screenCloseRequested: Boolean = false
    benefitPackageDetailsUnsaved: Boolean = false;
    benefitRuleDetailsUnsaved: Boolean = false;

    grandfather: any = [];
    erisaval: any = []
    searchModel = new SearchModel(
        "benefitpackagemasters/lookup",
        BenefitPackageMasterLookup.BENEFIT_PACKAGE_MASTER_ALL,
        BenefitPackageMasterLookup.BENEFIT_PACKAGE_MASTER_DEFAULT,
        []
    );
    menuOpened = "";
    dataWindowId: string;
    @ViewChild(DynamicUserDefinedFieldsComponent, { static: false }) userDefinedFields: DynamicUserDefinedFieldsComponent;
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    benefitMasterFetched: boolean;
    benefitMasterSaved: boolean;
    grid2Status: boolean = true;
    public secWin: SecWinViewModel;
    private windowId = 'BENEF';
    public isSuperUser = false;
    public secProgress = true;
    inProgress = true;
    secColDetails = new Array<SecColDetail>();
    userTemplateId: string;
    menuOpen = ""
    heightProessingOrder: number[] = [];
    constructor(
        private formBuilder: FormBuilder,
        public mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private benefProcessOrderMasterService: BenefProcessOrderMasterService,
        private systemCodesService: SystemCodesService,
        private benefitRuleService: BenefitRuleService,
        private dddwDtlService: DddwDtlService,
        private benefitPackageMasterService: BenefitPackageMasterService, private benefitPackageDetailService: BenefitPackageDetailService,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private benefProcessOrderDetailService: BenefProcessOrderDetailService,
        private router: Router,
        private userDefinedValidateCodeService: UserDefinedValidateCodeService,
        private sharedService: SharedService,
        private menuSerrvice: MenuService,
        private secWinService: SecWinService,
        private secUserService: SecUserService,
        private securityService: SecurityService,
        private secColDetailService: SecColDetailService,
        private auditService: AuditService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.winID = CONSTANTS.BENEFIT_PACKAGE_WINID;
        this.dataWindowId = CONSTANTS.BENEFIT_PACKAGE_DATA_WINDOWID;

        this.createForm();
        this.createForm2();
        this.displayMessage = {};
        this.menuInit();
        this.formValidation = new FormValidation(this.benefitPackageForm);
        this.formValidation = new FormValidation(this.benefitPackageDetailForm);
        this.getBenefProcessOrderMasters();
        this.createDataGrid001();
        this.createDataGrid002()
        this.getBenefitPackageMastersOrderByProcessingId();
        this.getSystemCodes();
        this.getCopayRestrictions();
        this.populateBenefitRule();
        this.getAuthRequestDropDown();
        this.getSubsFlag();
        this.getBenefitPackageGrandfathers();
        this.GetNonErisaGrp();
        setTimeout(() => {
            this.getBenefitPackageMastersV2();
        });
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        this.initializeComponentState();
        let userId = null;
        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            //this.getSecColDetails(user);
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

                //Check Menus Privilege Start
                let menuResponse = new MenuResponse();
                menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                if (menuResponse.status) {
                    this.menu = [];
                    this.menu = [...menuResponse.menus];
                }
                //Check Menus Privilege End

            } else {
                this.showPopUp1('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission');
            }
        }, error => {
            this.secProgress = false;
        });
    }


    showPopUp1(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('REASON_CODE_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    getCopayRestrictions() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_COPAY_LIB, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.copayRestrictions = systemCodes;
        });
    }

    getSystemCodes() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_APL_PAT_LIB, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.systemCodes = systemCodes;
        });
    }

    getBenefitPackageMasters() {
        this.benefitPackageMasterService.getBenefitPackageMasters().subscribe(benefitPackageMasters => {
            this.benefitPackageMasters = benefitPackageMasters;
            this.dataGrid001GridOptions.api.setRowData(this.benefitPackageMasters);
            if (this.benefitPackageMasters && this.benefitPackageMasters.length > 0) {
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                this.Grid1SelectionChange();
            }
        });
    }

    getBenefitPackageMastersV2() {
        this.benefitPackageMastersTemp = [];
        this.benefitPackageMasters = [];
        this.count = 0;
        this.benefitPackageMasterService.getBenefitPackageMasters().subscribe(benefitPackageMasters => {
            benefitPackageMasters.sort(
                (a, b) => (a.benefitPackageId > b.benefitPackageId) ? 1 : ((b.benefitPackageId > a.benefitPackageId) ? -1 : 0));
            this.benefitPackageMastersTemp = benefitPackageMasters;
            if (this.benefitPackageMastersTemp && this.benefitPackageMastersTemp.length > 0) {
                if (this.benefProcessOrderMasters && this.benefProcessOrderMasters.length > 0) {
                    this.benefitPackageMastersTemp.forEach(benefitPackageMaster => {
                        let status = this.checkExistBenefProcessOrderMaster(benefitPackageMaster.seqProcessingOrderId);
                        if (status) {
                            this.getProcessOrderId(benefitPackageMaster.seqProcessingOrderId);
                            let orderId = this.getProcessOrderId(benefitPackageMaster.seqProcessingOrderId);
                            benefitPackageMaster.processingOrdeID = orderId;
                            this.benefitPackageMasters.push(benefitPackageMaster);
                        }
                    });
                }

                if (this.count == this.benefitPackageMasters.length) {
                    this.dataGrid001GridOptions.api.setRowData([]);
                    this.dataGrid001GridOptions.api.setRowData(this.benefitPackageMasters);
                    this.keyValues = this.benefitPackageMasters[0].benefitPackageId;
                    this.searchStatus = true;
                    this.benefitMasterFetched = true;
                    if (this.benefitPackageMasters && this.benefitPackageMasters.length > 0) {
                        this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                    }
                }
            }
        });
    }

    getProcessOrderId(seqProcessingOrderId: any): any {
        let orderId: any;
        this.benefProcessOrderMasters.forEach(benefProcessOrderMaster => {
            if (benefProcessOrderMaster.seqProcessingOrderId == seqProcessingOrderId) {
                orderId = benefProcessOrderMaster.processingOrderId;
            }
        });
        return orderId
    }


    getSeqProcessingOrderIdbyProcessingOrderId(processingOrderId: any) {
        let seqProcessingOrderId: any;
        this.benefProcessOrderMasters.forEach(benefProcessOrderMaster => {
            if (benefProcessOrderMaster.processingOrderId == processingOrderId) {
                seqProcessingOrderId = benefProcessOrderMaster.seqProcessingOrderId;
            }
        });
        return seqProcessingOrderId
    }

    checkExistBenefProcessOrderMaster(seqProcessingOrderId: any): boolean {
        let status = false;
        this.benefProcessOrderMasters.forEach(benefProcessOrderMaster => {
            if (benefProcessOrderMaster.seqProcessingOrderId == seqProcessingOrderId) {
                this.count = this.count + 1;
                status = true;
            }
        });

        return status;
    }

    Grid1SelectionChange() {
        let benefitPackageMaster: BenefitPackageMaster;
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.grid2Status = true;
            this.isReadOnly = true;
            this.benefitPackageForm.controls.processingOrderId.disable();
            this.benefitPackageDetailSeqId = this.benefitPackageId;
            this.benefitPackageId = selectedRows[0].benefitPackageId;
            this.getBenefitPackageMaster(btoa(selectedRows[0].benefitPackageId));
            this.getBenefitPackageDetail(selectedRows[0].benefitPackageId);
            this.processingOrderId = selectedRows[0].processingOrdeID;
            this.getProcessingIdDescriptionByOrderId(selectedRows[0].processingOrdeID);
            this.getBenefProcessOrderDetailBySeqProcessingOorderId(selectedRows[0].seqProcessingOrderId);

            this.seqProcessingOrderId = selectedRows[0].seqProcessingOrderId;
            selectedRows[0].seqProcessingOrderId;
            benefitPackageMaster = selectedRows[0];
            this.benefitPackage = benefitPackageMaster
            this.setBenefitPackageValue(benefitPackageMaster);

            this.editFlagStatus = true;
            this.benefitPackageDetailsUnsaved = false;
            this.benefitRuleDetailsUnsaved = false;
        } else {
            this.searchStatus = false;
            this.grid2Status = false;
            this.getBenefitPackageDetail('0');
            this.seqProcessingOrderId = null;
            this.isReadOnly = false;
            this.benefitPackageForm.controls.processingOrderId.enable();
            this.getBenefProcessOrderDetailBySeqProcessingOorderId(0);
        }
    }


    getBenefitPackageDetail(benefitPackageId: string) {
        this.benefitPackageDetailsTemp = [];
        this.benefitPackageDetailService.findByBenefitPackageId(btoa(benefitPackageId)).subscribe(benefitPackageDetail => {
            this.benefitPackageDetailsTemp = benefitPackageDetail;
            if (this.benefitPackageDetailsTemp && this.benefitPackageDetailsTemp.length > 0) {
                setTimeout(() => {
                    this.getBenefProcessOrderDetail(this.benefitPackageDetailsTemp);
                }, 1000);
            } else {
                this.dataGrid002GridOptions.api.setRowData([]);
                this.benefitPackageDetails = [];
                this.benefitPackageEditFlagStatus = false;
                this.createNewForm2Grid();
            }
        }, (error: any) => {
            this.benefitPackageDetails = [];
            this.benefitPackageEditFlagStatus = false;
        });
    }

    getBenefProcessOrderDetailBySeqProcessingOorderId(seqProcessingOorderId: any) {
        this.benefProcessOrderDetails = [];
        this.benefProcessOrderDetailService.getBenefProcessOrderDetail(seqProcessingOorderId).subscribe(benefProcessOrderDetails => {
            this.benefProcessOrderDetails = benefProcessOrderDetails;
        }, (error: any) => {
            this.benefProcessOrderDetails = [];
        });
    }


    getBenefProcessOrderDetail(benefitPackageDetails: BenefitPackageDetail[]) {
        this.benefitPackageDetails = [];
        this.dataGrid002GridOptions.api.setRowData([]);
        if (benefitPackageDetails.length > 0) {
            benefitPackageDetails.forEach(benefitPackageDetail => {
                this.benefProcessOrderDetails.forEach(benefProcessOrderDetail => {
                    if ((benefProcessOrderDetail.benefitType === benefitPackageDetail.benefitRule.ruleType) && (this.benefitPackageMaster.seqProcessingOrderId === benefProcessOrderDetail.seqProcessingOrderId)) {
                        benefitPackageDetail.benefProcessingOrder = benefProcessOrderDetail.processingOrder;
                        benefitPackageDetail.processingSequence = (benefitPackageDetail.processingOrder + '').substring(2);
                        this.benefitPackageDetails.push(benefitPackageDetail);
                    }
                });
            });

            if (this.benefitPackageDetails.length > 0) {
                this.benefitPackageDetail = this.benefitPackageDetails[0];
                this.dataGrid002GridOptions.api.setRowData(this.benefitPackageDetails);
                this.dataGrid002GridOptions.api.selectIndex(0, false, false);
                this.Grid2SelectionChange('');
            }
        }
    }

    deleteBenefitPackage() {
        if (this.isSuperUser) {
            this.deleteBenefitPakageData();
        } else {
            if (this.secWin.hasDeletePermission()) {
                this.deleteBenefitPakageData();
            } else {
                this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    }
    deleteBenefitPakageData() {
        let popUpMessage = new PopUpMessage(
            'Benefit Package',
            'Benefit Package',
            '29070: Press yes to delete all selected records',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'OK') {
                if (this.gridSelectionStatus) {
                    this.benefitPackageMasterService.deleteBenefitPackageMaster(btoa(this.benefitPackageMaster.benefitPackageId)).subscribe(response => {
                        for (let i = 0; i < this.benefitPackageMasters.length; i++) {
                            if (this.benefitPackageMasters[i].benefitPackageId == this.benefitPackageMaster.benefitPackageId) {
                                this.benefitPackageMasters.splice(i, 1);
                                break;
                            }
                        }
                        this.dataGrid001GridOptions.api.setRowData(this.benefitPackageMasters);
                        if (this.benefitPackageMasters && this.benefitPackageMasters.length > 0) {
                            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                            this.Grid1SelectionChange();
                        }
                        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                    });
                } else {
                    let seqBenefitPackageIds: string[]=[];
                    let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
                    if (selectedRows.length > 0) {
                        selectedRows.forEach((obj: any) => {
                            seqBenefitPackageIds.push(obj.benefitPackageDetailPrimaryKey.seqBenPackage);
                        });
                        this.benefitPackageDetailService.deleteMultipleBenefitPackagesDetail(btoa(this.benefitPackageDetail.benefitPackageDetailPrimaryKey.benefitPackageId), seqBenefitPackageIds).subscribe(response => {
                            this.getBenefitPackageDetail(this.benefitPackageDetail.benefitPackageDetailPrimaryKey.benefitPackageId);
                            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                        });
                    }
                }
            }
        }, (error: any) => {
            this.showErrorPopUp(error, 'Benefit Package')
        });
    }

    showErrorPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    Grid2SelectionChange(seqBenPackage: any) {
        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            if (selectedRows.length == 1) {
                this.benefitPackageDetailService.findByBenefitPackageIdAndSeqBenPackage(btoa(selectedRows[0].benefitPackageDetailPrimaryKey.benefitPackageId),
                    encodeURI(selectedRows[0].benefitPackageDetailPrimaryKey.seqBenPackage)).subscribe(benefitPackageDetail => {
                    this.benefitPackageDetails = benefitPackageDetail;
                    this.benefitPackageDetail = benefitPackageDetail[0];
                    this.benefitShortDesc = benefitPackageDetail[0]['benefitRule']['shortDescription'];
                    this.benefitrule = benefitPackageDetail[0]['benefitRule']['ruleId'];
                    let processingOrder = benefitPackageDetail[0]['processingOrder'];
                    this.benefitPackageDetailForm.patchValue({
                        'authReq': benefitPackageDetail[0]['authReq'],
                        'fromMonthsTbThruMonths': benefitPackageDetail[0]['noMosContThru'],
                        'ruleId': benefitPackageDetail[0]['benefitRule']['ruleId'],
                        'procOrder': selectedRows[0].benefProcessingOrder,
                        'procSeq': (processingOrder + '').substring(2),
                        'startDate': this.dateFormatPipe.defaultDisplayDateFormat(benefitPackageDetail[0]['startDate']),
                        'endDate': this.dateFormatPipe.defaultDisplayDateFormat(benefitPackageDetail[0]['endDate']),
                        'benefitWeightedAccumulatorId': benefitPackageDetail[0]['weightedValueAccum'],
                        'fromMonths': benefitPackageDetail[0]['noMosContFrom'] ? benefitPackageDetail[0]['noMosContFrom'] : 0,
                        'ThruMonths': benefitPackageDetail[0]['noMosContThru'] ? benefitPackageDetail[0]['noMosContThru'] : 999,
                        'subsFlag': benefitPackageDetail[0]['supDepRule'],
                        'ApplyPar': benefitPackageDetail[0]['applyPar'],
                        'applyWuthLevel': benefitPackageDetail[0]['authLevel'],
                        'ApplyRiders': benefitPackageDetail[0]['applyRider']

                    });
                    if (benefitPackageDetail[0]['adjustForOcPaid'] == 'Y') {
                        this.benefitPackageDetailForm.patchValue({
                            'adjustForOcPd': benefitPackageDetail[0]['adjustForOcPd'] ? benefitPackageDetail[0]['adjustForOcPd'] : 'Y'
                        });
                        this.adjustForOcPdStatus = true;
                    } else {
                        this.adjustForOcPdStatus = false;
                    }
                    this.benefitPackageDetailId = this.benefitPackageDetails[0].benefitPackageDetailPrimaryKey.benefitPackageId;
                    this.benefitPackageDetailSeqId = this.benefitPackageDetails[0].benefitPackageDetailPrimaryKey.seqBenPackage;
                    this.benefitPackageEditFlagStatus = true;
                    this.benefitRuleDetailsUnsaved = false;
                });
            } else {
                this.resetForm2();
            }
        } else {
            this.resetForm2();
        }
    }

    getBenefitPackageMaster(benefitPackageId: string) {
        this.benefitPackageMasterService.getBenefitPackageMaster(benefitPackageId).subscribe(benefitPackageMaster => {
            if (benefitPackageMaster.patlibPercent === null) {
                benefitPackageMaster.patlibPercent = 0
            }
            this.benefitPackageMaster = benefitPackageMaster;
            let percentageValue = this.benefitPackageMaster.patlibPercent * 100;
            setTimeout(() => {
                this.userDefinedFields.updateUserDefinedValues(this.benefitPackageMaster);
            }, 100);
            this.benefitPackageForm.patchValue({
                'benefitPackageId': this.benefitPackageMaster.benefitPackageId,
                'shortDescription': this.benefitPackageMaster.shortDescription,
                'processingOrderId': this.processingOrderId,
                'applyPatLiabilityTo': this.benefitPackageMaster.applyPatlibTo,
                'copayRestriction': this.benefitPackageMaster.patientLiability,
                'percentage': percentageValue.toFixed(2),
                'narrative': this.benefitPackageMaster.narrative,
                'userDefined1': this.benefitPackageMaster.userDefined1,
                'userDefined2': this.benefitPackageMaster.userDefined2,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.benefitPackageMaster.userDate1),
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.benefitPackageMaster.userDate2),

            });
        });
    }

    updateBenefitPackageMaster(benefitPackageId: string) {

        this.formValidation.validateForm();
        if (this.benefitPackageForm.valid) {
            let benefitPackageMaster = new BenefitPackageMaster();
            benefitPackageMaster.benefitPackageId = this.benefitPackageForm.get('benefitPackageId').value;
            benefitPackageMaster.seqProcessingOrderId = this.seqProcessingOrderId;
            benefitPackageMaster.shortDescription = this.benefitPackageForm.get('shortDescription').value;
            benefitPackageMaster.applyPatlibTo = this.benefitPackageForm.get('applyPatLiabilityTo').value;
            benefitPackageMaster.patientLiability = this.benefitPackageForm.get('copayRestriction').value;
            if (this.benefitPackageForm.get('percentage').value !== null) {
                let perValue = this.benefitPackageForm.get('percentage').value;
                let checkCorrectValue = perValue / 1;
                let actualValue = 0;
                if (Number.isNaN(checkCorrectValue)) {
                    actualValue = this.mask.removePercentage(this.benefitPackageForm.get('percentage').value);
                    benefitPackageMaster.patlibPercent = actualValue / 100;
                } else {
                    actualValue = (this.benefitPackageForm.get('percentage').value) / 100;
                    benefitPackageMaster.patlibPercent = actualValue;
                }

            }
            benefitPackageMaster.narrative = this.benefitPackageForm.get('narrative').value;
            benefitPackageMaster.userDefined1 = this.userDefinedFields.userDefinedFieldForm.get('userDefined1').value;
            benefitPackageMaster.userDefined2 = this.userDefinedFields.userDefinedFieldForm.get('userDefined2').value;
            benefitPackageMaster.userDate1 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate1');
            benefitPackageMaster.userDate2 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate2');
            benefitPackageMaster.insertProcess = this.benefitPackage.insertProcess;
            benefitPackageMaster.insertUser = this.benefitPackage.insertUser;
            this.auditService.setAuditFields(benefitPackageMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);

            this.benefitPackageMasterService.updateBenefitPackageMaster(benefitPackageMaster, btoa(benefitPackageMaster.benefitPackageId)).subscribe(response => {
                this.updateGrid1(benefitPackageMaster);
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.benefitPackageDetailsUnsaved = false;
                if (this.screenCloseRequested && this.isFormDetailsUnsaved() == false) {
                    setTimeout(() => { this.activeModal.close() }, 2000);
                }
            });
        } else {
            this.alertMessage =
                this.alertMessageService.error('Required information is missing or incomplete.Please correct your entries and try again.');
        }
    }

    updateGrid1(benefitPackageMaster: BenefitPackageMaster) {
        this.benefitPackageMastersTemp = [];
        this.benefitPackageMastersTemp = this.benefitPackageMasters;
        this.benefitPackageMasters = [];
        this.dataGrid001GridOptions.api.setRowData([]);
        for (let i = 0; i < this.benefitPackageMastersTemp.length; i++) {
            if (this.benefitPackageMastersTemp[i].benefitPackageId === benefitPackageMaster.benefitPackageId) {
                this.benefitPackageMastersTemp[i].shortDescription = benefitPackageMaster.shortDescription;
            }
            this.benefitPackageMasters.push(this.benefitPackageMastersTemp[i]);
        }
        this.dataGrid001GridOptions.api.setRowData(this.benefitPackageMasters);
    }


    createBenefitPackageMaster() {
        this.formValidation.validateForm();
        if (this.benefitPackageForm.valid) {
            let benefitPackageMaster = new BenefitPackageMaster();
            this.seqProcessingOrderId = this.getSeqProcessingOrderIdbyProcessingOrderId(this.processingOrderId);
            benefitPackageMaster.benefitPackageId = this.benefitPackageForm.get('benefitPackageId').value;
            benefitPackageMaster.seqProcessingOrderId = this.seqProcessingOrderId;
            benefitPackageMaster.shortDescription = this.benefitPackageForm.get('shortDescription').value;
            benefitPackageMaster.applyPatlibTo = this.benefitPackageForm.get('applyPatLiabilityTo').value;
            benefitPackageMaster.patientLiability = this.benefitPackageForm.get('copayRestriction').value;

            let actualValue = 0
            if (this.benefitPackageForm.get('percentage').value !== null) {
                actualValue = this.mask.removePercentage(this.benefitPackageForm.get('percentage').value);
                benefitPackageMaster.patlibPercent = actualValue / 100;
            }
            benefitPackageMaster.narrative = this.benefitPackageForm.get('narrative').value;

            benefitPackageMaster.userDefined1 = this.userDefinedFields.userDefinedFieldForm.get('userDefined1').value;
            benefitPackageMaster.userDefined2 = this.userDefinedFields.userDefinedFieldForm.get('userDefined2').value;
            benefitPackageMaster.userDate1 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate1');
            benefitPackageMaster.userDate2 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate2');
            this.auditService.setAuditFields(benefitPackageMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);

            this.benefitPackageMasterService.createBenefitPackageMaster(benefitPackageMaster).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.getBenefProcessOrderMasters();
                setTimeout(() => {
                    this.getBenefitPackageMastersV2();
                });
                this.benefitPackageDetailsUnsaved = false;
                if (this.screenCloseRequested && this.isFormDetailsUnsaved() == false) {
                    setTimeout(() => { this.activeModal.close() }, 2000);
                }
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Required information is missing or incomplete. Please correct your entries and try again.');
        }
    }


    createBenefitPackageDetail() {
        this.formValidation.validateForm();
        if (this.benefitPackageDetailForm.valid) {
            let status = this.checkProcSeq();
            if (!status) {
                let benefitPackageDetail = new BenefitPackageDetail();
                benefitPackageDetail.benefitPackageId = this.benefitPackageId;
                benefitPackageDetail.benefitRule = this.benefitPackageDetailForm.get('ruleId').value;
                benefitPackageDetail.processingOrder = this.benefitPackageDetailForm.get('procOrder').value + this.benefitPackageDetailForm.get('procSeq').value;
                benefitPackageDetail.parProvReq = 'N';


                if (this.benefitPackageDetailForm.get('ApplyPar').value === 'None') {
                    benefitPackageDetail.applyPar = 'N'
                } else {
                    benefitPackageDetail.applyPar = this.benefitPackageDetailForm.get('ApplyPar').value;
                }

                if (this.benefitPackageDetailForm.get('applyWuthLevel').value === 'None') {
                    benefitPackageDetail.authLevel = 'N';
                } else {
                    benefitPackageDetail.authLevel = this.benefitPackageDetailForm.get('applyWuthLevel').value;
                }

                if (this.benefitPackageDetailForm.get('ApplyRiders').value === 'None') {
                    benefitPackageDetail.applyRider = 'N';
                } else {
                    benefitPackageDetail.applyRider = this.benefitPackageDetailForm.get('ApplyRiders').value;
                }


                benefitPackageDetail.startDate = Form.getDateValue(this.benefitPackageDetailForm, 'startDate');
                benefitPackageDetail.endDate = Form.getDateValue(this.benefitPackageDetailForm, 'endDate');
                benefitPackageDetail.authReq = this.benefitPackageDetailForm.get('authReq').value;

                if (this.adjustForOcPdStatus) {
                    benefitPackageDetail.adjustForOcPaid = 'Y';
                } else {
                    benefitPackageDetail.adjustForOcPaid = 'N';
                }



                benefitPackageDetail.noMosContFrom = this.benefitPackageDetailForm.get('fromMonths').value;
                benefitPackageDetail.noMosContThru = this.benefitPackageDetailForm.get('ThruMonths').value;
                benefitPackageDetail.supDepRule = this.benefitPackageDetailForm.get('subsFlag').value;
                benefitPackageDetail.weightedValueAccum = this.benefitPackageDetailForm.get('benefitWeightedAccumulatorId').value;

                this.auditService.setAuditFields(benefitPackageDetail, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
                this.benefitPackageDetailService.createBenefitPackageDetailV2(benefitPackageDetail).subscribe(response => {
                    this.toastService.showToast('Record created successfully.', NgbToastType.Success)
                    this.getBenefitPackageDetail(benefitPackageDetail.benefitPackageId);
                    this.benefitRuleDetailsUnsaved = false;
                    this.gridSelectionStatus = false;
                    if (this.screenCloseRequested && this.isFormDetailsUnsaved() == false) {
                        setTimeout(() => { this.activeModal.close() }, 2000);
                    }
                });
            } else {
                this.messageService.findByMessageId(21212).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('21212: ' + message[0].messageText, 'Benefit Package')
                });
            }
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }

    checkProcSeq() {
        let status: boolean = false;
        let processingOrder = this.benefitPackageDetailForm.get('procOrder').value + this.benefitPackageDetailForm.get('procSeq').value;
        this.benefitPackageDetails.forEach(benefitPackageDetail => {
            if (parseInt(processingOrder) === benefitPackageDetail.processingOrder) {
                return status = true;
            }
        });
        return status;
    }


    updateBenefitPackageDetail() {
        this.formValidation.validateForm();
        if (this.benefitPackageDetailForm.valid) {

            let benefitPackageDetail = new BenefitPackageDetail();
            benefitPackageDetail.benefitPackageId = this.benefitPackageDetailId;
            benefitPackageDetail.seqBenPackage = this.benefitPackageDetailSeqId;
            benefitPackageDetail.benefitRule = this.benefitPackageDetailForm.get('ruleId').value;
            benefitPackageDetail.processingOrder = this.benefitPackageDetailForm.get('procOrder').value + this.benefitPackageDetailForm.get('procSeq').value;
            benefitPackageDetail.parProvReq = 'N';

            if (this.benefitPackageDetailForm.get('ApplyPar').value === 'None') {
                benefitPackageDetail.applyPar = 'N'
            } else {
                benefitPackageDetail.applyPar = this.benefitPackageDetailForm.get('ApplyPar').value;
            }

            if (this.benefitPackageDetailForm.get('applyWuthLevel').value === 'None') {
                benefitPackageDetail.authLevel = 'N';
            } else {
                benefitPackageDetail.authLevel = this.benefitPackageDetailForm.get('applyWuthLevel').value;
            }

            if (this.benefitPackageDetailForm.get('ApplyRiders').value === 'None') {
                benefitPackageDetail.applyRider = 'N';
            } else {
                benefitPackageDetail.applyRider = this.benefitPackageDetailForm.get('ApplyRiders').value;
            }

            benefitPackageDetail.startDate = Form.getDateValue(this.benefitPackageDetailForm, 'startDate');
            benefitPackageDetail.endDate = Form.getDateValue(this.benefitPackageDetailForm, 'endDate');
            benefitPackageDetail.authReq = this.benefitPackageDetailForm.get('authReq').value;

            if (this.adjustForOcPdStatus) {
                benefitPackageDetail.adjustForOcPaid = 'Y';
            } else {
                benefitPackageDetail.adjustForOcPaid = 'N';
            }



            benefitPackageDetail.noMosContFrom = this.benefitPackageDetailForm.get('fromMonths').value;
            benefitPackageDetail.noMosContThru = this.benefitPackageDetailForm.get('ThruMonths').value;
            benefitPackageDetail.supDepRule = this.benefitPackageDetailForm.get('subsFlag').value;
            benefitPackageDetail.weightedValueAccum = this.benefitPackageDetailForm.get('benefitWeightedAccumulatorId').value;

            this.auditService.setAuditFields(benefitPackageDetail, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.benefitPackageDetailService.updateBenefitPackageDetailV2(benefitPackageDetail, this.benefitPackageDetailSeqId, btoa(this.benefitPackageDetailId)).subscribe(response => {
                this.toastService.showToast('Record updated successfully.', NgbToastType.Success)
                this.getBenefitPackageDetail(benefitPackageDetail.benefitPackageId);
                this.benefitRuleDetailsUnsaved = false;
                this.gridSelectionStatus = false;
                if (this.screenCloseRequested && this.isFormDetailsUnsaved() == false) {
                    setTimeout(() => { this.activeModal.close() }, 2000);
                }
            });
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getBenefitPackgaeShortcutKeys(this));
        this.cdr.detectChanges();
    }


    showPopUp(message: string, title: string, button: string = "Ok") {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton(button, button, 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    openFunctionalGroupShortcut() {
        const ref = this.modalService.open(FunctionalGroupShortCutComponent);
        ref.componentInstance.showIcon = true;
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


    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        let params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        let params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
            rowSelection: 'single'
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Benefit Package ID',
                field: 'benefitPackageId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                resizable: true,
                checkboxSelection: true
            },
            {
                headerName: 'Description',
                field: 'shortDescription',
                resizable: true,
                width: 150
            }
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50,
            rowSelection: 'single'
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Rule ID',
                field: 'benefitRule.ruleId',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Type',
                field: 'benefitRule.ruleType',
                width: 150
            },
            {
                headerName: 'Description',
                field: 'benefitRule.shortDescription',
                width: 150
            },
            {
                headerName: 'Proc Order',
                field: 'benefProcessingOrder',
                width: 150
            },
            {
                headerName: 'Proc Seq',
                field: 'processingSequence',
                width: 150
            },
            {
                headerName: 'Start Date',
                field: 'startDate',
                width: 150
            },
            {
                headerName: 'End Date',
                field: 'endDate',
                width: 150
            }
        ];
    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    newFormCretion() {
        if (this.isSuperUser) {
            this.formCreation();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.formCreation();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    }

    formCreation() {
        if (this.gridSelectionStatus) {
            this.processingOrderIdDescription = '';
            this.createForm();
            this.createForm2();
            this.editFlagStatus = false;
            this.processingOrderId = '';
            this.benefitrule = '';
            this.benefitShortDesc = '';
            this.dataGrid001GridOptions.api.deselectAll();
            this.dataGrid002GridOptions.api.setRowData([]);
            this.benefitPackageForm.reset();
            this.benefitPackageDetailForm.reset();
            this.userDefinedFields.userDefinedFieldForm.reset();
            this.isReadOnly = false;
            this.benefitPackageForm.controls.processingOrderId.enable();
            this.benefitPackageForm.patchValue({
                'percentage': '0.00%',
                'processingOrderId': '',
                'fromMonths': 0,
                'ThruMonths': 999
            });
            this.userDefinedFields.reset();
            this.grid2Status = false;
        } else {
            this.createNewForm2Grid();
        }
    }

    createNewForm2Grid() {
        const processingOrder = this.benefitPackageMastersOrderByProcessId.find(m => m.processingOrderId === '11');          // will give you object of dropdown value
        this.createForm2();
        this.benefitrule = '';
        this.benefitShortDesc = '';
        this.benefitPackageEditFlagStatus = false;
        this.benefitPackageDetailForm.reset();
        this.setProcSeqValue('000');
        this.benefitPackageDetailForm.patchValue({
            'applyWuthLevel': 'None',
            'ApplyPar': 'None',
            'ApplyRiders': 'None',
            'fromMonths': 0,
            'ThruMonths': 999,
            'authReq': 'X',
            'adjustForOcPd': 'Y'
        });
        this.adjustForOcPdStatus = true;
        this.dataGrid002GridOptions.api.deselectAll();
    }

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.editFlagStatus = false;
        this.benefitPackageForm = this.formBuilder.group({
            benefitPackageId: ['', { updateOn: 'blur', validators: [Validators.required] }],
            shortDescription: ['', { updateOn: 'blur', validators: [Validators.required] }],
            processingOrderId: ['', { updateOn: 'blur', validators: [Validators.required] }],
            applyPatLiabilityTo: ['', { updateOn: 'blur', validators: [Validators.required] }],
            copayRestriction: ['', { updateOn: 'blur', validators: [] }],
            percentage: ['', { updateOn: 'blur', validators: [] }],
            narrative: ['', { updateOn: 'blur', validators: [] }],
            grandfathered: ['', { updateOn: 'blur', validators: [] }],
            erisa: ['', { updateOn: 'blur', validators: [] }],
            gfEffect: ['', { updateOn: 'blur', validators: [] }],
            gfTerm: ['', { updateOn: 'blur', validators: [] }],
            userDate1: ['', { updateOn: 'blur', validators: [] }],
            userDate2: ['', { updateOn: 'blur', validators: [] }],
            userDefined1: ['', { updateOn: 'blur', validators: [] }],
            userDefined2: ['', { updateOn: 'blur', validators: [] }],

        }, { updateOn: 'submit' });

        this.benefitPackageForm.controls['percentage'].disable();

    }

    createForm2() {
        this.benefitPackageDetailForm = this.formBuilder.group({
            ruleId: ['', { updateOn: 'blur', validators: [] }],
            procOrder: ['', { updateOn: 'blur', validators: [] }],
            procSeq: ['', { updateOn: 'blur', validators: [] }],
            startDate: ['', { updateOn: 'blur', validators: [] }],
            endDate: ['', { updateOn: 'blur', validators: [] }],
            authReq: ['', { updateOn: 'blur', validators: [] }],
            applyWuthLevel: ['None', { updateOn: 'blur', validators: [] }],
            ApplyPar: ['None', { updateOn: 'blur', validators: [] }],
            ApplyRiders: ['None', { updateOn: 'blur', validators: [] }],
            adjustForOcPd: ['', { updateOn: 'blur', validators: [] }],
            fromMonths: ['', { updateOn: 'blur', validators: [] }],
            ThruMonths: ['', { updateOn: 'blur', validators: [] }],
            subsFlag: ['', { updateOn: 'blur', validators: [] }],
            benefitWeightedAccumulatorId: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    proccessingOrderIdStatus = false;
    saveFormData() {
        this.saveData();
    }

    saveData() {
        if (this.gridSelectionStatus) {
            let status = this.validateGrid1Form1();
            if (status) {
                if (this.editFlagStatus) {
                    if (!this.isSuperUser) {
                        if (this.secWin.hasUpdatePermission()) {
                            this.updateBenefitPackageMaster(this.benefitPackageId);
                            this.userDefinedFields.submit();
                        } else {
                            this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                                this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
                            });
                        }
                    } else {
                        this.updateBenefitPackageMaster(this.benefitPackageId);
                        this.userDefinedFields.submit();
                    }

                } else {
                    if (!this.isSuperUser) {
                        if (this.secWin.hasInsertPermission()) {
                            this.createBenefitPackageMaster();
                            this.userDefinedFields.submit();
                        } else {
                            this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                                this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                            });
                        }
                    } else {
                        this.createBenefitPackageMaster();
                        this.userDefinedFields.submit();
                    }
                }

            }
        } else {
            if (this.benefitPackageEditFlagStatus) {
                if (!this.isSuperUser) {
                    if (this.secWin.hasUpdatePermission()) {
                        this.updateBenefitPackageDetail();
                    } else {
                        this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                            this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
                        });
                    }
                } else {
                    this.updateBenefitPackageDetail();
                }
            } else {
                let status = this.validateGrid2Form2();
                if (status) {
                    if (!this.isSuperUser) {
                        if (this.proccessingOrderIdStatus) {
                            this.createBenefitPackageDetail();
                        } else {
                            this.messageService.findByMessageId(21023).subscribe((message: MessageMasterDtl[]) => {
                                this.toastService.showToast(
                                    '21023: ' + message[0].messageText,
                                    NgbToastType.Danger
                                );
                            });
                        }
                    } else {
                        this.createBenefitPackageDetail();
                    }
                }
            }

        }
    }



    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.newFormCretion();
                    this.benefitPackageForm.enable();
                    break;
                }
                case 'Open': {
                    //statements;
                    break;
                }
                case 'Delete': {
                    this.deleteBenefitPackage();
                    break;
                }
                case 'Shortcut Menu': {
                    this.openFunctionalGroupShortcut();
                    break;
                }
                case 'Save': {
                    this.saveFormData();
                    break;
                }
                case 'Close': {
                    this.modalClose();
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
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            switch (event.action) {
                case 'Lookup': {
                    this.onLookupActionClick();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case 'Audit Display': {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.winID);
                        if ((status)) {
                            let ref = this.modalService.open(AuditDisplayComponent, { size: 'lg' });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.benefitPackageId;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('30164: ' + message[0].messageText);
                        });
                    }
                }
                break;
                case 'Show Timestamp':
                    if (this.benefitPackageForm.get('benefitPackageId').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
            }

        } else if (event.menu.menuItem === 'Special') {
            switch (event.action) {
                case 'Copy Benefit Package': {
                    this.copyBenefitPackage();
                    break;
                }
                case 'Define Benefit Value Filters': {
                    this.defineBenefitValueFilters();
                    break;
                }
                case 'Benefit User Fields': {
                    this.benefitUserFields();
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
    }

    copyBenefitPackage() {
        this.formValidation.validateForm();
        let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_BENEF_COPY_PKG);
        if (this.validateInputForCopy()) {
            if (status) {
                const ref = this.modalService.open(CopyBenefitPackageComponent, { size: <any>'xl' });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.allBenefitPackages = this.benefitPackageMasters;
                const rows = this.dataGrid001GridOptions.api.getSelectedRows();
                if (rows != null && rows.length > 0) {
                    ref.componentInstance.selectedBenefitPackage = rows[0];
                }
                ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                    this.copyBenefitPackageMasters = event;
                    this.benefitPackageDetails = (this.benefitPackageDetails && this.benefitPackageDetails.length > 0)
                        ? this.benefitPackageDetails : [];
                    const updatedBenefitPackageDetails = this.benefitPackageDetails.concat(event);
                    //this.dataGrid002GridOptions.api.setRowData(updatedBenefitPackageDetails);
                    this.showPopUpForDetails();
                });
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    }

    defineBenefitValueFilters() {
        const rows = this.dataGrid002GridOptions.api.getSelectedRows();
        let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DEF_BEN_FIL);
        if (rows != null && rows.length > 0) {
            if (status) {
                const ref = this.modalService.open(DefineBenefitValueFiltersComponent, { size: <any>'xl' });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.benefitPackageDetail = rows[0];
                ref.componentInstance.benefitPackageId = this.benefitPackageId;
            } else {
                this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                    this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                });
            }

        } else {
            this.toastService.showToast('Please select benefit package detail record', NgbToastType.Danger);
        }
    }

    benefitUserFields() {
        let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DEF_BEN_FIL);
        if (status) {
            const ref = this.modalService.open(BenefitPackageUserFieldsComponent, { size: <any>'xl' });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.benefitPackageId = this.benefitPackageId;
        } else {
            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
            });
        }
    }

    validateInputForCopy() {
        if (!this.benefitPackageForm.get('benefitPackageId').value) {
            this.alertMessage =
                this.alertMessageService.error('29032: benefit_package_id is a required field. Enter the something other than blanks.');
            return false;
        }

        if (!this.benefitPackageForm.get('shortDescription').value) {
            this.alertMessage =
                this.alertMessageService.error('29034: Value required for short_description.');
            return false;
        }

        if (!this.benefitPackageForm.get('applyPatLiabilityTo').value) {
            this.alertMessage =
                this.alertMessageService.error('29034: Value required for apply_pat_liab.');
            return false;
        }

        return true;
    }

    showPopUpForDetails() {
        this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('saveBeforeExit', 'Benefit Package', '29065: ' + message[0].messageText, 'icon');
            popUpMessage.buttons = [
                new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('No', 'No', 'btn btn-primary'),
                new PopUpMessageButton('Cancel', 'Cancel', '')
            ];
            popUpMessage.messageType = MessageType.SUCCESS;
            let ref = this.sharedService.showDialogBox(popUpMessage);
            ref.buttonclickEvent.subscribe((event: any) => {
                if (event.name == 'Yes') {
                    let body: any = [];
                    if (this.copyBenefitPackageMasters != null && this.copyBenefitPackageMasters.length > 0) {
                        for (let i = 0; i < this.copyBenefitPackageMasters.length; i++) {
                            let data = this.copyBenefitPackageMasters[i];
                            let reqData = data;
                            reqData.benefitPackageDetailPrimaryKeyModel = {
                                seqBenPackage: data.benefitPackageDetailPrimaryKey.seqBenPackage,
                                benefitPackageId: data.benefitPackageDetailPrimaryKey.benefitPackageId
                            };
                            this.auditService.setAuditFields(reqData, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
                            if (reqData) {
                                if (reqData.benefitRule) {
                                    reqData.benefitRule.insertDatetime = null;
                                    reqData.benefitRule.updateDatetime = null;
                                }
                            }
                            body.push(reqData);
                        }
                        let benefitPackageId: string;
                        this.benefitMasterSaved = false;
                        if (!this.editFlagStatus) {
                            this.createBenefPackCopy();
                            benefitPackageId = this.benefitPackageForm.get('benefitPackageId').value;
                        } else {
                            let benefitPackage = this.dataGrid001GridOptions.api.getSelectedRows()[0];
                            benefitPackageId = benefitPackage.benefitPackageId
                            this.benefitMasterSaved = true;
                        }

                        const saveInterval = setInterval(() => {
                            if (this.benefitMasterSaved) {
                                this.copyBenfitPackageDetails(benefitPackageId, body);
                                clearInterval(saveInterval);
                            }
                        }, 1000);
                    }
                } else {
                    this.dataGrid002GridOptions.api.setRowData(this.benefitPackageDetails);
                }
            });
        });
    }

    private copyBenfitPackageDetails(benefitPackageId: string, body: any[]) {

        this.benefitPackageDetailService.copyBenfitPackageDetails(btoa(benefitPackageId), body).subscribe(response => {
            this.toastr.showToast('Record successfully created', NgbToastType.Success);
            this.benefitMasterFetched = false;
            this.getBenefitPackageDetail(benefitPackageId);
            //this.getBenefitPackageMastersV2();
            // const interval = setInterval(() => {
            //     if (this.benefitMasterFetched) {
            //         this.dataGrid001GridOptions.api.forEachNode(node => {
            //             if (node.data.benefitPackageId === benefitPackageId) {
            //                 node.setSelected(true);
            //             }
            //         });
            //         this.Grid1SelectionChange();
            //         clearInterval(interval);
            //     }
            // }, 1000);
        });
    }

    createBenefPackCopy() {
        let benefitPackageMaster = new BenefitPackageMaster();
        this.seqProcessingOrderId = this.getSeqProcessingOrderIdbyProcessingOrderId(this.processingOrderId);
        benefitPackageMaster.benefitPackageId = this.benefitPackageForm.get('benefitPackageId').value;
        benefitPackageMaster.seqProcessingOrderId = this.seqProcessingOrderId;
        benefitPackageMaster.shortDescription = this.benefitPackageForm.get('shortDescription').value;
        benefitPackageMaster.applyPatlibTo = this.benefitPackageForm.get('applyPatLiabilityTo').value;
        benefitPackageMaster.patientLiability = this.benefitPackageForm.get('copayRestriction').value;

        if (this.benefitPackageForm.get('percentage').value !== null) {
            benefitPackageMaster.patlibPercent = this.mask.removePercentage(this.benefitPackageForm.get('percentage').value);
        }
        benefitPackageMaster.narrative = this.benefitPackageForm.get('narrative').value;
        benefitPackageMaster.userDefined1 = this.benefitPackageForm.get('grandfathered').value;
        benefitPackageMaster.userDefined2 = Form.getDateValue(this.benefitPackageForm, 'gfEffect');
        benefitPackageMaster.userDate1 = this.benefitPackageForm.get('erisa').value;
        benefitPackageMaster.userDate2 = Form.getDateValue(this.benefitPackageForm, 'gfTerm');


        this.benefitPackageMasterService.createBenefitPackageMaster(benefitPackageMaster).subscribe(response => {
            this.benefitMasterSaved = true;
        });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M' },
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Delete', shortcutKey: 'Ctrl+D' },
                    { name: 'Save', shortcutKey: 'Ctrl+S' },
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true }, { name: 'Exit' }]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z' },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X' },
                    { name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C' },
                    { name: 'Paste', shortcutKey: 'Ctrl+V' },
                    { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8' },
                    { name: 'Previous', shortcutKey: 'F7' }]
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Copy Benefit Package'},
                    { name: 'Define Benefit Value Filters'},
                    { name: 'Benefit User Fields'}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [{ name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { name: 'Audit Display', shortcutKey: 'Shift+Alt+A' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' }, { name: '2 Benefit Package' }]
            },
            {
                menuItem: 'Help',
                dropdownItems: [{ name: 'Contents' }, { name: 'Search for Help on' }, { name: 'This Window', shortcutKey: 'F1' }, { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { name: 'About Diamond Client/Server' }]
            }
        ];

    }


    getBenefitPackageMastersOrderByProcessingId() {
        this.benefProcessOrderMasterService.getBenefitPackageMastersOrderByProcessingId().subscribe(benefitPackageMasters => {
            this.benefitPackageMastersOrderByProcessId = [];
            this.benefitPackageMastersOrderByProcessId = benefitPackageMasters;
        });
    }


    getBenefProcessOrderMasters() {
        this.benefProcessOrderMasters = [];
        this.benefProcessOrderMasterService.getBenefProcessOrderMasters().subscribe(benefProcessOrderMasters => {
            this.benefProcessOrderMasters = benefProcessOrderMasters;
        });
    }

    onCopayRestrictionChange(event: any) {
        let value = event.target.value;
        if (value) {
            this.benefitPackageForm.controls['percentage'].enable();
        } else {
            this.benefitPackageForm.controls['percentage'].disable();
        }
        this.markPackageDetailAsUpdated();

    }

    changeProcessingId(event: any) {
        let processOrderId = event.target.value;
        this.getProcessingIdDescriptionByOrderId(processOrderId);
        this.markPackageDetailAsUpdated();
    }

    getProcessingIdDescriptionByOrderId(processingOrderId: any) {
        if (processingOrderId === null || processingOrderId ==="") {
            this.processingOrderIdDescription = "";
        }
        else{
            this.benefProcessOrderMasters.forEach(benefProcessOrderMaster => {
                if (benefProcessOrderMaster.processingOrderId === processingOrderId) {
                    this.processingOrderIdDescription = benefProcessOrderMaster.description;
                }
            });
        }
    }

    erisa: any;
    setBenefitPackageValue(benefitpackage: BenefitPackageMaster) {
        let percentageValue = benefitpackage.patlibPercent * 100;
        this.benefitPackageForm.patchValue({
            'benefitPackageId': benefitpackage.benefitPackageId,
            'shortDescription': benefitpackage.shortDescription,
            'narrative': benefitpackage.narrative,
            'processingOrderId': this.processingOrderId,
            'applyPatLiabilityTo': benefitpackage.applyPatlibTo,
            'copayRestriction': benefitpackage.patientLiability,
            'percentage': percentageValue.toFixed(2),
            'userDefined1': benefitpackage.userDefined1,
            'userDefined2': benefitpackage.userDefined2,
            'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(benefitpackage.userDate1),
            'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(benefitpackage.userDate2),
        });
    }


    populateBenefitRule() {
        this.benefitRuleService.findByBenefitRuleOrderByRuleId().subscribe(benefitRules => {
            this.benefitRules = benefitRules;
        });
    }


    selectRule(event: any) {
        this.gridSelectionStatus = false;
        let ruleId = event.target.value;
        this.getBenefitRuleByRuleId(ruleId);
        this.markRulesDetailsAsUpdated();
    }

    getBenefitRuleByRuleId(ruleId: any) {
        this.benefitRules.forEach(benefitRule => {
            if (benefitRule.ruleId === ruleId) {
                this.benefitrule = benefitRule.ruleType;
                this.benefitShortDesc = benefitRule.shortDescription;
                this.getProcessSeq(benefitRule);
            }
        });
    }

    getProcessSeq(benefitrule: BenefitRule) {
        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            let heightProessingOrder: number[] = [];
            if ((selectedRows[0].benefitRule.ruleId !== benefitrule.ruleId) && (selectedRows[0].benefitRule.ruleType !== benefitrule.ruleType)) {
                this.benefitPackageDetailsTemp.forEach(benefitPackageDetail => {
                    if ((benefitrule.ruleId === benefitPackageDetail.benefitRule.ruleId) && (benefitrule.ruleType === benefitPackageDetail.benefitRule.ruleType)) {
                        heightProessingOrder.push(benefitPackageDetail.processingOrder);
                        const maxPrcessing = heightProessingOrder.reduce((a, b) => Math.max(a, b));
                        let newProcessingOrderValue = maxPrcessing + 5;
                        let newProcessSeq = (newProcessingOrderValue + '').substring(2);
                        this.setProcSeqValue(newProcessSeq);
                    }
                });
            } else {
                let newProcessingOrderValue = selectedRows[0].processingOrder + 5;
                let newProcessSeq = (newProcessingOrderValue + '').substring(2);
                this.setProcSeqValue(newProcessSeq);
            }
        } else {
            let count = 0;
            let heightProessingOrder: number[] = [];
            if (this.benefitPackageDetailsTemp !== null) {

                heightProessingOrder = this.getMaxProcessingOrderId(benefitrule, this.benefitPackageDetailsTemp);

                if (heightProessingOrder.length > 0) {
                    const maxPrcessing = heightProessingOrder.reduce((a, b) => Math.max(a, b));
                    let mPrcessing = (maxPrcessing + '').substring(2);
                    if (parseInt(mPrcessing) >= 999) {
                        this.messageService.findByMessageId(21011).subscribe((message: MessageMasterDtl[]) => {
                            this.form1PopupAlert('21011: ' + message[0].messageText, 'Benefit Package')
                        });
                        this.setProcSeqValue('003');
                    } else {
                        let newProcessingOrderValue = maxPrcessing + 5;
                        let newProcessSeq = (newProcessingOrderValue + '').substring(2);
                        this.setProcSeqValue(newProcessSeq);
                    }
                } else {
                    this.setProcSeqValue('005');
                }
            } else {
                this.setProcSeqValue('005');
            }
        }
        this.getProcessOrder(benefitrule.ruleType);
    }

    getMaxProcessingOrderId(benefitrule: BenefitRule, benefitPackageDetailsTemp: BenefitPackageDetail[]) {
        this.heightProessingOrder = [];
        this.benefitPackageDetailsTemp.forEach(benefitPackageDetail => {
            if ((benefitrule.ruleType === benefitPackageDetail.benefitRule.ruleType)) {
                if((benefitrule.ruleId === benefitPackageDetail.benefitRule.ruleId) ){
                    this.messageService.findByMessageId(21227).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage('saveBeforeExit', 'Member Master', '21227: ' + message[0].messageText, 'icon');
                        popUpMessage.buttons = [
                            new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                            new PopUpMessageButton('No', 'No', 'btn btn-primary')
                        ];
                        popUpMessage.messageType = MessageType.SUCCESS;
                        let ref = this.sharedService.showDialogBox(popUpMessage);
                        ref.buttonclickEvent.subscribe((event: any) => {
                            if (event.name === 'Yes') {
                               this.createBenefitPackageDetail();
                            } else if (event.name === 'No') {
                               this.createBenefitPackageDetail();
                            }
                        });                   
                    });
                }
                //let newProcessSeq = (benefitPackageDetail.processingOrder + '').substring(2);
                this.heightProessingOrder.push(parseInt(benefitPackageDetail.processingOrder));
            }
        });

        return this.heightProessingOrder;

    }

    getProcessOrder(benefitType: any) {
        this.benefProcessOrderDetail = new BenefProcessOrderDetail();
        this.benefProcessOrderDetailService.getBenefProcessOrderDetailByBenfitTypeAndSeqProcessingOrderId(benefitType, this.benefitPackageMaster.seqProcessingOrderId).subscribe(benefProcessOrderDetail => {
            this.benefProcessOrderDetail = benefProcessOrderDetail;
            this.benefitPackageDetailForm.patchValue({
                'procOrder': this.benefProcessOrderDetail.processingOrder
            });
            this.proccessingOrderIdStatus = true;
        }, error => {
            this.proccessingOrderIdStatus = false;
            this.setProcSeqValue('000');
            this.messageService.findByMessageId(21023).subscribe((message: MessageMasterDtl[]) => {
                this.toastService.showToast(
                    '21023: ' + message[0].messageText,
                    NgbToastType.Danger
                );
            });
        });
    }



    setProcSeqValue(procSeq: any) {
        this.benefitPackageDetailForm.patchValue({
            'procSeq': procSeq,
        });
    }




    getAuthRequestDropDown() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DW_COLUMN_AUTH_REQ, CONSTANTS.DW_BENEF_DETAIL_DE).subscribe(dddwDtls => {
            this.dddwDtls = dddwDtls;
        });
    }

    getSubsFlag() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DW_COLUMN_SUP_DEP_RULE, CONSTANTS.DW_BENEF_DETAIL_DE).subscribe(dddwDtls => {
            this.dddwDtls1 = dddwDtls;
        });
    }


    gridSelection(status: boolean) {
        this.gridSelectionStatus = status;
    }

    changeStatus(status: boolean) {
        if (status) {
            this.adjustforOCPdFlag = 'Y';
            this.adjustForOcPdStatus = true;
        } else {
            this.adjustforOCPdFlag = 'N';
            this.adjustForOcPdStatus = false;
        }
        this.markRulesDetailsAsUpdated();
    }

    checkPackageId(event: any) {
        let benefitPackageIdValue = event.target.value;

        this.benefitPackageMasters.forEach(benefitPackageMaster => {
            if (benefitPackageMaster.benefitPackageId === benefitPackageIdValue) {
                this.benefitPackageForm.patchValue({
                    'benefitPackageId': ''
                });
                this.messageService.findByMessageId(7109).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('7109: ' + message[0].messageText, 'Benefit Package')
                });
            }
        });

    }

    showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = 'Benefit Package';
        ref.componentInstance.insertUser = this.benefitPackage.insertUser;
        ref.componentInstance.insertDateTime = this.benefitPackage.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.benefitPackage.insertProcess;
        ref.componentInstance.updateUser = this.benefitPackage.updateUser;
        ref.componentInstance.updateDateTime = this.benefitPackage.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.benefitPackage.updateProcess;
    };







    resetForm2() {
        this.createForm2();
        this.benefitrule = '';
        this.benefitShortDesc = '';
        this.benefitPackageEditFlagStatus = false;
        this.benefitPackageDetailForm.reset();
        this.setProcSeqValue('000');
        this.benefitPackageDetailForm.patchValue({
            'applyWuthLevel': 'None',
            'ApplyPar': 'None',
            'ApplyRiders': 'None'
        });
    }



    modalClose = () => {
        this.screenCloseRequested = true;
        if (this.isFormDetailsUnsaved()) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Benefit Package')
            })
        } else {
            this.activeModal.close()
        }
    };
    markPackageDetailAsUpdated() {
        this.benefitPackageDetailsUnsaved = true;
        this.gridSelectionStatus = true;
    }
    markRulesDetailsAsUpdated() {
        this.benefitRuleDetailsUnsaved = true;
        this.gridSelectionStatus = false;
    }

    isFormDetailsUnsaved(): Boolean {
        return this.benefitPackageDetailsUnsaved || this.benefitRuleDetailsUnsaved;
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveFormData()
                } else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    getBenefitPackageGrandfathers() {
        this.benefitPackageMasterService.getUserDefinedDataTypes().subscribe((userValidCodeList: any) => {
            if (userValidCodeList) {
                this.grandfather = userValidCodeList;
            } else {
                this.grandfather = [];
            }
        });
    }

    GetNonErisaGrp() {
        this.userDefinedValidateCodeService.getUserDefinedValidateCode('benefit_package_master', 'user_defined_2').subscribe(
            (userDefinedValidateCodes: any) => {
                this.erisaval = userDefinedValidateCodes;
            }
        );
    }

    validateGrid1Form1(): any {
        let status = false;
        if (!this.benefitPackageForm.get('benefitPackageId').value) {
            this.messageService.findByMessageId(27013).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('27013: ' + message[0].messageText.replace('@1', 'benefit_package_id'), 'Benefit Package')
            });
            status = false;

        }
        else if (!this.benefitPackageForm.get('shortDescription').value) {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'short_description'), 'Benefit Package')
            });
            status = false;
        } else if (!this.benefitPackageForm.get('processingOrderId').value) {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'c_processing_order_id'), 'Benefit Package')
            });
            status = false;
        } else if (!this.benefitPackageForm.get('applyPatLiabilityTo').value) {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'apply_patlib_to'), 'Benefit Package')
            });
            status = false;
        } else {
            status = true;
        }
        return status;
    }


    validateGrid2Form2(): any {
        let status = false;
        this.gridSelectionStatus = false;
        if (!this.benefitPackageDetailForm.get('ruleId').value) {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'benefit_rule'), 'Benefit Package')
            });
            status = false;
        } else if (!this.benefitPackageDetailForm.get('procSeq').value) {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'processing_sequence'), 'Benefit Package')
            });
            status = false;
        } else if (this.benefitPackageDetailForm.get('fromMonths').value === undefined || this.benefitPackageDetailForm.get('fromMonths').value === null) {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'no_mos_cont_from'), 'Benefit Package')
            });
            status = false;
        } else if (!this.benefitPackageDetailForm.get('ThruMonths').value) {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'no_mos_cont_thru'), 'Benefit Package')
            });
            status = false;
        } else {
            status = true;
        }
        return status;
    }

    form1PopupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Ok') {
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    onLookupShortDescriptionFieldChange(event: any) {
        this.gridSelectionStatus = true;
        if (event.key === "F5") {
            event.preventDefault();
            this.messageService.findByMessageId(6128).subscribe((message: MessageMasterDtl[]) => {
                this.popupLookupAlert('6128: ' + message[0].messageText, 'Benefit Package')
            });
        } else if (event.key === "Tab") {
            if (!event.target.value) {
                event.preventDefault();
                this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('29032: ' + message[0].messageText.replace('@1', 'short_description'), 'Benefit Package')
                });
            }
        }
    }


    onLookupFieldChange(event: any) {
        this.gridSelectionStatus = true;
        if (event.key === "F5") {
            event.preventDefault();
            this.messageService.findByMessageId(6128).subscribe((message: MessageMasterDtl[]) => {
                this.popupLookupAlert('6128: ' + message[0].messageText, 'Benefit Package')
            });
        } else if (event.key === "Tab") {
            if (!this.isReadOnly) {
                if (event.target.value) {
                    this.checkPackageIdExist(event.target.value, event);
                } else {
                    event.preventDefault();
                    this.messageService.findByMessageId(27013).subscribe((message: MessageMasterDtl[]) => {
                        this.form1PopupAlert('27013: ' + message[0].messageText.replace('@1', 'benefit_package_id'), 'Benefit Package')
                    });
                }
            }
        }
    }

    onLookupActionClick() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.isCustomSearch = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                this.dataGrid001GridOptions.api.forEachNode(node => {
                    if (node.data.benefitPackageId === resp.benefitPackageId) {
                        node.setSelected(true);
                    }
                });
            }
        });
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                this.benefitPackageForm.patchValue({
                    'benefitPackageId': resp.benefitPackageId,
                });
                this.checkF5PackageId(resp.benefitPackageId);
            }
        });
    }


    checkF5PackageId(benefitPackageIdValue: any) {
        this.benefitPackageMasters.forEach(benefitPackageMaster => {
            if (benefitPackageMaster.benefitPackageId === benefitPackageIdValue) {
                this.benefitPackageForm.patchValue({
                    'benefitPackageId': ''
                });
                this.messageService.findByMessageId(7109).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('7109: ' + message[0].messageText, 'Benefit Package')
                });

            }
        });

    }


    popupLookupAlert = (message: string, title: string) => {
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
                    this.messageService.findByMessageId(27013).subscribe((message: MessageMasterDtl[]) => {
                        this.form1PopupAlert('27013: ' + message[0].messageText.replace('@1', 'benefit_package_id'), 'Benefit Package')
                    });
                } else if (resp.name === 'No') {
                    this.openLookupFieldSearchModel();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };


    checkPackageIdExist(benefitPackageIdValue: any, event: any) {
        this.benefitPackageMasters.forEach(benefitPackageMaster => {
            if (benefitPackageMaster.benefitPackageId === benefitPackageIdValue) {
                this.messageService.findByMessageId(7109).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('7109: ' + message[0].messageText, 'Benefit Package')
                });
                this.benefitPackageForm.patchValue({
                    'benefitPackageId': ''
                });
                event.preventDefault();
            }
        });

    }

    helpScreen = () => {
        const viewModal = this.modalService.open(BenefitsHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/BENEF_Benefit_Packages.htm';
    };

    selectGrid1() {
        this.gridSelectionStatus = true;
    }

    selectGrid2() {
        this.gridSelectionStatus = false;
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

    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    };

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
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Copy Benefit Package'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Define Benefit Value Filters'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'u':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Benefit User Fields'
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
}
