/* Copyright (c) 2021 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
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
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageMasterDtl, ProcedureCodeMaster } from "../../../api-models/index"
import { ProcedureCodeMasterService } from "../../../api-services/procedure-code-master.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import {
    DddwDtlService,
    MessageMasterDtlService,
    ProcedureDeterminantService,
    SystemCodesService
} from '../../../api-services';
import { ReasonCodeMasterService } from '../../../api-services/reason-code-master.service';
import { Menu, SearchModel } from '../../../shared/models/models';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { Y } from 'angular-mydatepicker';
import { getProcedureCodeShortcutKeys, SharedService } from '../../../shared/services/shared.service';
import { ProcedureCodeMasterLookup } from '../../../shared/lookup/procedure-code-master-lookup';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { ProcedureDeterminantComponent } from '../procedure-determinant/procedure-determinant.component';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { MedMgmtAuditComponent } from '../med-mgmt-audit/med-mgmt-audit.component';
import { BenefitsHelpComponent } from "../../benefits/benefits-help/benefits-help.component";
import { PricingHelpComponent } from "../pricing-help/pricing-help.component";
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';

// Use the Component directive to define the ProcedureCodeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "procedurecode",
    templateUrl: "./procedure-code.component.html",
    providers: [
        ProcedureCodeMasterService,
        MessageMasterDtlService,
        SystemCodesService,
        DddwDtlService,
        ReasonCodeMasterService,
        ToastService,
        ProcedureDeterminantService,
    ],
})
export class ProcedureCodeComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    procedureCodeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'PROCD';
    public isSuperUser = false;
    public secProgress = true;
    secColDetails = new Array<SecColDetail>();
    menu: Menu[] = [];
    @Input() showIcon: boolean = false;

    @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
    userTemplateId: any;
    IdQualifier: import("../../../api-models/system-codes.model").SystemCodes[];
    holdReasons: import("../../../api-models/reason-code-master.model").ReasonCodeMaster[];
    asterikProcedure: any;
    CodeClass: any;
    FollowUpDaysError: boolean;
    CountAsError: boolean;
    asterikProError: boolean;
    FromAgeError: boolean;
    ageToNullError: boolean;
    ageToLessThenAgeFromError: boolean;
    ToAgeError: boolean;
    fromAgeGreaterError: boolean;
    effectiveDateError: boolean;
    termDateError: boolean;
    showProcedureCodeFields: boolean;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    countAsDays: any;
    genderPaitent: any;
    allowedReason: any;
    closeStatus: Boolean = false;
    popupClose: Boolean = false;
    idQualifier: string;
    isValueChanges: boolean;
    newProcedureStatus: boolean = false;
    editProcedureCodeMaster: boolean=false;
    isEditStatus:boolean=false;
    procedureCodeMaster: ProcedureCodeMaster;
    procedureCodeMasters: ProcedureCodeMaster[];

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons = [
            new PopUpMessageButton("Yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("No", "No", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === "Yes") {
                this.procedureCodeForm.get("procedureCode").disable();
                this.showProcedureCodeFields=true;
                this.isEditStatus = false;
                this.procedureCodeForm.patchValue({
                    'asteriskProcedure':'N',
                    'countAsDays':'N'
                });
            }
        });
    }

    procedureCodeSearchModel = new SearchModel(
        "procedurecodemasters/lookup",
        ProcedureCodeMasterLookup.PROCEDURE_CODE_MASTER_ALL,
        ProcedureCodeMasterLookup.PROCEDURE_CODE_MASTER_DEFAULT,
        []
    );

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == "yes") {
            console.log("button yes has been click!");
        }
        if (button.name == "no") {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }

    createProcedureCodeMaster() {
        this.formValidation.validateForm();
        if (this.procedureCodeForm.valid) {
            let procedureCodeMaster = new ProcedureCodeMaster();
            procedureCodeMaster.procedureCode = Form.getValue(
                this.procedureCodeForm,
                "procedureCode"
            );
            procedureCodeMaster.shortDescription = Form.getValue(
                this.procedureCodeForm,
                "shortDescription"
            );
            procedureCodeMaster.fullDescription = Form.getValue(
                this.procedureCodeForm,
                "fullDescription"
            );
            procedureCodeMaster.effectiveDate = Form.getDatePickerValue(
                this.procedureCodeForm,
                "effectiveDate"
            );
            procedureCodeMaster.termDate = Form.getDatePickerValue(
                this.procedureCodeForm,
                "termDate"
            );
            if (Form.getValue(this.procedureCodeForm, "idQualifier")) {
                let qualifier = this.IdQualifier.find(item => item.systemCodeDesc1 === Form.getValue(this.procedureCodeForm, "idQualifier"));
                procedureCodeMaster.productServiceIdQualifier = qualifier.systemCode;
            }
            procedureCodeMaster.asteriskProcedure = Form.getValue(
                this.procedureCodeForm,
                "asteriskProcedure"
            );
            procedureCodeMaster.targetRevCodeFlg = Form.getValue(
                this.procedureCodeForm,
                "targetRevenueCode"
            );
            procedureCodeMaster.primaryGrouping = Form.getValue(
                this.procedureCodeForm,
                "primaryGrouping"
            );
            procedureCodeMaster.priceIndicatorFlg = Form.getValue(
                this.procedureCodeForm,
                "priceIndicator"
            );
            if (Form.getValue(this.procedureCodeForm, "userDate1")) {
                procedureCodeMaster.userDate1 = Form.getDatePicker(Form.getValue(this.procedureCodeForm, "userDate1").singleDate.date);
            }
            procedureCodeMaster.secondaryGrouping = Form.getValue(
                this.procedureCodeForm,
                "secondaryGrouping"
            );
            procedureCodeMaster.toothNumberRequired = Form.getValue(
                this.procedureCodeForm,
                "toothReq"
            );
            procedureCodeMaster.userDefined1 = Form.getValue(
                this.procedureCodeForm,
                "userDefined1"
            );
            procedureCodeMaster.userDefined2 = Form.getValue(
                this.procedureCodeForm,
                "userDefined2"
            );
            procedureCodeMaster.followUpDays = Form.getValue(
                this.procedureCodeForm,
                "followUpDays"
            );
            procedureCodeMaster.surfaceRequired = Form.getValue(
                this.procedureCodeForm,
                "surfaceReq"
            );
            if (Form.getValue(this.procedureCodeForm, "userDate2")) {
                procedureCodeMaster.userDate2 = Form.getDatePicker(Form.getValue(this.procedureCodeForm, "userDate2").singleDate.date);
            }
            procedureCodeMaster.codeClass = Form.getValue(
                this.procedureCodeForm,
                "codeClass"
            );
            procedureCodeMaster.archRequired = Form.getValue(
                this.procedureCodeForm,
                "archRequired"
            );
            procedureCodeMaster.allowedReason = Form.getValue(
                this.procedureCodeForm,
                "allowedReason"
            );
            procedureCodeMaster.countAsDays = Form.getValue(
                this.procedureCodeForm,
                "countAsDays"
            );
            procedureCodeMaster.quadrantRequired = Form.getValue(
                this.procedureCodeForm,
                "quadrantReq"
            );
            procedureCodeMaster.fromAge = Form.getValue(
                this.procedureCodeForm,
                "fromAge"
            );
            procedureCodeMaster.holdReason = Form.getValue(
                this.procedureCodeForm,
                "holdReason"
            );
            procedureCodeMaster.oralCavityRequired = Form.getValue(
                this.procedureCodeForm,
                "oralCavReq"
            );
            procedureCodeMaster.toAge = Form.getValue(
                this.procedureCodeForm,
                "toAge"
            );
            procedureCodeMaster.holdDate = Form.getDatePickerValue(
                this.procedureCodeForm,
                "holdDate"
            );
            procedureCodeMaster.weightedValue = Form.getValue(
                this.procedureCodeForm,
                "weightedVal"
            );
            procedureCodeMaster.patientGender = Form.getValue(
                this.procedureCodeForm,
                "patientGender"
            );
            procedureCodeMaster.instAuthDtlLnk = Form.getValue(
                this.procedureCodeForm,
                "instAuthDetailLink"
            );
            this.procedureCodeMasterService
                .createProcedureCodeMaster(procedureCodeMaster)
                .subscribe(
                    (response) => {
                        this.alertMessage = this.alertMessageService.info(
                            "Record successfully created."
                        );

                        this.GetAllFormData(procedureCodeMaster.procedureCode);
                        this.editProcedureCodeMaster = false;
                        this.newProcedureStatus = true;
                        this.isValueChanges = false;
                        this.isEditStatus=true;
                        if (this.closeStatus === true) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000)
                        }
                        this.popupClose = false;
                    });
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    saveProcedureCodeMaster() {
        if (this.isSuperUser) {
            if (this.isEditStatus) {
                this.updateProcedureCodeMaster(this.procedureCodeMaster.procedureCode);
            } else {
                this.createProcedureCodeMaster();
            }
        } else {
            if (this.isEditStatus) {
                if (this.secWin.hasUpdatePermission()) {
                    this.updateProcedureCodeMaster(this.procedureCodeMaster.procedureCode);
                } else {
                    this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Procedure Code')
                    });
                    this.editProcedureCodeMaster = false;
                }
            } else {
                if (this.secWin.hasInsertPermission()) {
                    this.createProcedureCodeMaster();
                } else {
                    this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Procedure Code')
                    });
                    this.editProcedureCodeMaster = false;
                }
            }
        }

        // if (this.editProcedureCodeMaster && this.isValueChanges && this.newProcedureStatus) {
        //     if (this.allRowValidations) {
        //         this.updateProcedureCodeMaster(this.procedureCodeMaster.procedureCode);
        //     }
        // } else {
        //     if (this.allRowValidations) {
        //         this.createProcedureCodeMaster();
        //     }
        // }
    }

    TrueFalseToYAndN(data: any) {
        if (data == true) {
            return "Y";
        } else {
            return "N";
        }
    }

    TrueFalseTo1Or0(data: any) {
        if (data == true) {
            return 1;
        } else {
            return 0;
        }
    }

    updateProcedureCodeMaster(procedureCode: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.procedureCodeForm.valid) {
            let procedureCodeMaster = new ProcedureCodeMaster();
            procedureCodeMaster.procedureCode = Form.getValue(
                this.procedureCodeForm,
                "procedureCode"
            );
            procedureCodeMaster.shortDescription = Form.getValue(
                this.procedureCodeForm,
                "shortDescription"
            );
            procedureCodeMaster.fullDescription = Form.getValue(
                this.procedureCodeForm,
                "fullDescription"
            );
            procedureCodeMaster.effectiveDate = Form.getDatePickerValue(
                this.procedureCodeForm,
                "effectiveDate"
            );
            procedureCodeMaster.termDate = Form.getDatePickerValue(
                this.procedureCodeForm,
                "termDate"
            );
            if (Form.getValue(this.procedureCodeForm, "idQualifier")) {
                let qualifier = this.IdQualifier.find(item => item.systemCodeDesc1 === Form.getValue(this.procedureCodeForm, "idQualifier"));
                procedureCodeMaster.productServiceIdQualifier = qualifier.systemCode;
            }
            procedureCodeMaster.asteriskProcedure = Form.getValue(
                this.procedureCodeForm,
                "asteriskProcedure"
            );
            procedureCodeMaster.targetRevCodeFlg = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "targetRevenueCode")
            );
            procedureCodeMaster.primaryGrouping = Form.getValue(
                this.procedureCodeForm,
                "primaryGrouping"
            );
            procedureCodeMaster.priceIndicatorFlg = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "priceIndicator")
            );
            if (Form.getValue(this.procedureCodeForm, "userDate1")) {
                procedureCodeMaster.userDate1 = Form.getDatePicker(Form.getValue(this.procedureCodeForm, "userDate1").singleDate.date);
            }
            procedureCodeMaster.secondaryGrouping = Form.getValue(
                this.procedureCodeForm,
                "secondaryGrouping"
            );
            procedureCodeMaster.toothNumberRequired = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "toothReq")
            );
            procedureCodeMaster.userDefined1 = Form.getValue(
                this.procedureCodeForm,
                "userDefined1"
            );
            procedureCodeMaster.userDefined2 = Form.getValue(
                this.procedureCodeForm,
                "userDefined2"
            );
            procedureCodeMaster.followUpDays = Form.getValue(
                this.procedureCodeForm,
                "followUpDays"
            );
            procedureCodeMaster.surfaceRequired = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "surfaceReq")
            );
            if (Form.getValue(this.procedureCodeForm, "userDate2")) {
                procedureCodeMaster.userDate2 = Form.getDatePicker(Form.getValue(this.procedureCodeForm, "userDate2").singleDate.date);
            }
            procedureCodeMaster.codeClass = Form.getValue(
                this.procedureCodeForm,
                "codeClass"
            );
            procedureCodeMaster.archRequired = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "archRequired")
            );
            procedureCodeMaster.allowedReason = Form.getValue(
                this.procedureCodeForm,
                "allowedReason"
            );
            procedureCodeMaster.countAsDays = Form.getValue(
                this.procedureCodeForm,
                "countAsDays"
            );
            procedureCodeMaster.quadrantRequired = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "quadrantReq")
            );
            procedureCodeMaster.fromAge = Form.getValue(
                this.procedureCodeForm,
                "fromAge"
            );
            procedureCodeMaster.holdReason = Form.getValue(
                this.procedureCodeForm,
                "holdReason"
            );
            procedureCodeMaster.oralCavityRequired = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "oralCavReq")
            );
            procedureCodeMaster.toAge = Form.getValue(
                this.procedureCodeForm,
                "toAge"
            );
            procedureCodeMaster.holdDate = Form.getDatePickerValue(
                this.procedureCodeForm,
                "holdDate"
            );
            procedureCodeMaster.weightedValue = this.TrueFalseTo1Or0(
                Form.getValue(this.procedureCodeForm, "weightedVal")
            );
            procedureCodeMaster.patientGender = Form.getValue(
                this.procedureCodeForm,
                "patientGender"
            );
            procedureCodeMaster.instAuthDtlLnk = this.TrueFalseToYAndN(
                Form.getValue(this.procedureCodeForm, "instAuthDetailLink")
            );
            this.procedureCodeMasterService
                .updateProcedureCodeMaster(procedureCodeMaster, procedureCode)
                .subscribe(
                    (response) => {
                        this.toastService.showToast(
                            "Record successfully updated.",
                            NgbToastType.Success
                        );
                        this.isEditStatus=true;
                        if (this.closeStatus === true) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000)
                        }
                        this.popupClose = false;
                    });
        } else {
            this.toastService.showToast(
                "Some required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }

    deleteProcedureCodeMaster(procedureCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp("Not permitted to delete", "Group Master Security");
        } else {
            this.procedureCodeMasterService
                .deleteProcedureCodeMaster(procedureCode)
                .subscribe(
                    (response) => {
                        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                    }
                );
        }
    }

    getProcedureCodeMaster(procedureCode: string) {
        this.procedureCodeMasterService
            .getProcedureCodeMaster(procedureCode)
            .subscribe(
                (procedureCodeMaster) => {
                    this.procedureCodeMaster = procedureCodeMaster;
                    this.procedureCodeForm.patchValue({
                        procedureCode: this.procedureCodeMaster.procedureCode,
                        shortDescription: this.procedureCodeMaster.shortDescription,
                        fullDescription: this.procedureCodeMaster.fullDescription,
                        effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(
                            this.procedureCodeMaster.effectiveDate
                        ),
                        termDate: this.dateFormatPipe.defaultDisplayDateFormat(
                            this.procedureCodeMaster.termDate
                        ),
                        idQualifier: this.procedureCodeMaster.productServiceIdQualifier,
                        asteriskProcedure: this.procedureCodeMaster.asteriskProcedure,
                        targetRevenueCode: this.procedureCodeMaster.targetRevCodeFlg,
                        primaryGrouping: this.procedureCodeMaster.primaryGrouping,
                        priceIndicator: this.procedureCodeMaster.priceIndicatorFlg,
                        userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
                            this.procedureCodeMaster.userDate1
                        ),
                        secondaryGrouping: this.procedureCodeMaster.secondaryGrouping,
                        toothReq: this.procedureCodeMaster.toothNumberRequired,
                        userDefined1: this.procedureCodeMaster.userDefined1,
                        userDefined2: this.procedureCodeMaster.userDefined2,
                        followUpDays: this.procedureCodeMaster.followUpDays,
                        surfaceReq: this.procedureCodeMaster.surfaceRequired,
                        userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
                            this.procedureCodeMaster.userDate2
                        ),
                        codeClass: this.procedureCodeMaster.codeClass,
                        archRequired: this.procedureCodeMaster.archRequired,
                        allowedReason: this.procedureCodeMaster.allowedReason,
                        countAsDays: this.procedureCodeMaster.countAsDays,
                        quadrantReq: this.procedureCodeMaster.quadrantRequired,
                        fromAge: this.procedureCodeMaster.fromAge,
                        holdReason: this.procedureCodeMaster.holdReason,
                        oralCavReq: this.procedureCodeMaster.oralCavityRequired,
                        toAge: this.procedureCodeMaster.toAge,
                        holdDate: this.dateFormatPipe.defaultDisplayDateFormat(
                            this.procedureCodeMaster.holdDate
                        ),
                        weightedVal: this.procedureCodeMaster.weightedValue,
                        patientGender: this.procedureCodeMaster.patientGender,
                        instAuthDetailLink: this.procedureCodeMaster.instAuthDtlLnk,
                    });
                }
            );
    }

    getProcedureCodeMasters() {
        this.procedureCodeMasterService.getProcedureCodeMasters().subscribe(
            (procedureCodeMasters) => {
                this.procedureCodeMasters = procedureCodeMasters;
            }
        );
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        public activeModal: NgbActiveModal,
        private sharedService: SharedService,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        private ProcedureDeterminantService: ProcedureDeterminantService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private systemCode: SystemCodesService,
        private DddwDtlService: DddwDtlService,
        private ReasonCodeMasterService: ReasonCodeMasterService,
        private messageService: MessageMasterDtlService,
        private secColDetailService: SecColDetailService,
        private router: Router,
        private procedureCodeMasterService: ProcedureCodeMasterService,
        private renderer: Renderer2,
        private menuSerrvice: MenuService
    ) {
    }

    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.procedureCodeForm);
        this.procedureCodeForm.valueChanges.subscribe(() => {
            this.isValueChanges = true;
            if (this.isValueChanges && this.newProcedureStatus) {
                this.editProcedureCodeMaster = true;
            }
        });

    }

    initializePermission(): void {
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

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProcedureCodeShortcutKeys(this));
        this.cdr.detectChanges();
    }

    @Input() procedureCode?: string;

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.procedureCodeForm);
        this.getIDQualifier();
        this.GetAsterikProcedure();
        this.GetCodeClass();
        this.GetHoldReason();
        this.GetAllowedReason();
        this.getCountAsDays();
        this.datesCheck();
        this.getGenderPaitent();
        //For Topic Menu when come from child screen

        if (this.procedureCode) {
            this.procedureCodeForm.patchValue({
                procedureCode: this.procedureCode,
            });
            this.GetAllFormData(this.procedureCode)
        }
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
                    //Check Menus Privilege Start
                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
                    //Check Menus Privilege End

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        "You are not Permitted to view Procedure Code Screen",
                        "Procedure Code Permission"
                    );
                }
            },
            (error) => {
                this.showPopUp(error, "Window Error");
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
        this.secColDetailService
            .findByTableNameAndUserId("MEMBER_MASTER", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.procedureCodeForm = this.formBuilder.group(
            {
                procedureCode: ["", { updateOn: "blur", validators: [] }],
                dynamicText: ["", { updateOn: "blur", validators: [] }],
                shortDescription: [
                    "",
                    { updateOn: "blur", validators: [Validators.required] },
                ],
                fullDescription: ["", { updateOn: "blur", validators: [] }],
                effectiveDate: ["", { updateOn: "blur", validators: [] }],
                termDate: ["", { updateOn: "blur", validators: [] }],
                idQualifier: [
                    "",
                    { updateOn: "blur", validators: [Validators.required] },
                ],
                asteriskProcedure: [
                    "",
                    { updateOn: "blur", validators: [Validators.required] },
                ],
                targetRevenueCode: ["", { updateOn: "blur", validators: [] }],
                userDefined1: ["", { updateOn: "blur", validators: [] }],
                primaryGrouping: ["", { updateOn: "blur", validators: [Validators.maxLength(3)] }],
                priceIndicator: ["", { updateOn: "blur", validators: [] }],
                userDate1: ["", { updateOn: "blur", validators: [] }],
                secondaryGrouping: ["", { updateOn: "blur", validators: [Validators.maxLength(3)] }],
                toothReq: ["", { updateOn: "blur", validators: [] }],
                userDefined2: ["", { updateOn: "blur", validators: [] }],
                followUpDays: ["", { updateOn: "blur", validators: [Validators.pattern("^[0-9]*$")] }],
                surfaceReq: ["", { updateOn: "blur", validators: [] }],
                userDate2: ["", { updateOn: "blur", validators: [] }],
                codeClass: ["", { updateOn: "blur", validators: [] }],
                archRequired: ["", { updateOn: "blur", validators: [] }],
                allowedReason: ["", { updateOn: "blur", validators: [] }],
                countAsDays: [
                    "",
                    { updateOn: "blur", validators: [Validators.required] },
                ],
                quadrantReq: ["", { updateOn: "blur", validators: [] }],
                fromAge: ["", { updateOn: "blur", validators: [Validators.pattern("^[0-9]*$")] }],
                holdReason: ["", { updateOn: "blur", validators: [] }],
                oralCavReq: ["", { updateOn: "blur", validators: [] }],
                toAge: ["", { updateOn: "blur", validators: [Validators.pattern("^[0-9]*$")] }],
                holdDate: ["", { updateOn: "blur", validators: [] }],
                weightedVal: ["", { updateOn: "blur", validators: [] }],
                patientGender: ["", { updateOn: "blur", validators: [] }],
                instAuthDetailLink: ["", { updateOn: "blur", validators: [] }],
            },
            { updateOn: "submit" }
        );
    }

    DescriptionValidator() {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value == null) {
                return null;
            }
            if (
                control.value.toString().length == 0 ||
                control.value.toString().length == 28
            ) {
                return null;
            }
            return { DescriptionError: true };
        };
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    popUpButtonClicked(button: any) {
        if (button.name === "yes") {
            //this.isUserGroupFieldOpen = true;
            this.createNewProcedure();
        }
        if (button.name === "no") {
            this.showProcedureCodeFields = false;
            console.log("button No has been click!");
        }
        this.popUpMessage = null;
    }

    createNewProcedure() {
        this.showProcedureCodeFields = true;
        this.editProcedureCodeMaster = false;
        this.datesCheck();
        this.procedureCodeForm.get("holdDate").disable();
        this.procedureCodeForm.get("procedureCode").disable();
    }

    GetAllFormData(value: any) {
        this.procedureCodeMasterService.getProcedureCodeMaster(value).subscribe(
            (data) => {
                if (data) {
                    this.datesCheck();
                    this.procedureCodeMaster = data;
                    this.showProcedureCodeFields = true;
                    this.editProcedureCodeMaster = true;
                    var targetRevCodeFlg = false;
                    var priceIndicatorFlg = false;
                    var toothNumberRequired = false;
                    var surfaceReq = false;
                    var archRequired = false;
                    var quadrantRequired = false;
                    var oralCavityRequired = false;
                    var instAuthDetailLink = false;
                    if (data.targetRevCodeFlg == "Y") {
                        targetRevCodeFlg = true;
                    }
                    if (data.priceIndicatorFlg == "Y") {
                        priceIndicatorFlg = true;
                    }
                    if (data.toothNumberRequired == "Y") {
                        toothNumberRequired = true;
                    }
                    if (data.toothNumberRequired == "Y") {
                        toothNumberRequired = true;
                    }
                    if (data.surfaceRequired == "Y") {
                        surfaceReq = true;
                    }
                    if (data.archRequired == "Y") {
                        archRequired = true;
                    }
                    if (data.quadrantRequired == "Y") {
                        quadrantRequired = true;
                    }
                    if (data.oralCavityRequired == "Y") {
                        oralCavityRequired = true;
                    }

                    if (data.instAuthDtlLnk == "Y") {
                        instAuthDetailLink = true;
                    }

                    let qualifier = this.IdQualifier.find(item => item.systemCode === data.productServiceIdQualifier);

                    this.procedureCodeForm.patchValue({
                        dynamicText: data.shortDescription,
                        shortDescription: data.shortDescription,
                        fullDescription: data.fullDescription,
                        effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(
                            data.effectiveDate
                        ),
                        termDate: this.dateFormatPipe.defaultDisplayDateFormat(
                            data.termDate
                        ),
                        idQualifier: qualifier.systemCodeDesc1,
                        asteriskProcedure: data.asteriskProcedure,
                        targetRevenueCode: targetRevCodeFlg,
                        userDefined1: data.userDefined1,
                        primaryGrouping: data.primaryGrouping,
                        priceIndicator: priceIndicatorFlg,
                        userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
                            data.userDate1
                        ),
                        secondaryGrouping: data.secondaryGrouping,
                        toothReq: toothNumberRequired,
                        userDefined2: data.userDefined2,
                        followUpDays: data.followUpDays,
                        surfaceReq: surfaceReq,
                        userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
                            data.userDate2
                        ),
                        codeClass: data.codeClass ? data.codeClass.trim() : "",
                        archRequired: archRequired,
                        allowedReason: data.allowedReason,
                        countAsDays: data.countAsDays,
                        quadrantReq: quadrantRequired,
                        fromAge: data.fromAge,
                        holdReason: data.holdReason,
                        oralCavReq: oralCavityRequired,
                        toAge: data.toAge,
                        holdDate: this.dateFormatPipe.defaultDisplayDateFormat(
                            data.holdDate
                        ),
                        weightedVal: data.weightedValue,
                        patientGender: data.patientGender,
                        instAuthDetailLink: instAuthDetailLink,
                    }, { emitEvent: false });
                    this.procedureCodeForm.get("procedureCode").disable();
                    this.isFormDataChanged();
                    this.newProcedureStatus = true;
                    this.editProcedureCodeMaster = false;
                    this.isEditStatus=true;
                } else {
                    this.messageService
                        .findByMessageId(5550)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "5550: " + message[0].messageText,
                                "Procedure Code"
                            );
                        });
                }
            },
            (error) => {
                this.messageService.findByMessageId(5550).subscribe(res => {
                    this.showPopUp('5550: ' + res[0].messageText, 'Procedure');
                    setTimeout(() => {
                         this.renderer.selectRootElement('#procedureCode').focus();
                    }, 1000)
                })
            }
        );
    }

    onProcedureCodeChange(event: any) {
        this.GetAllFormData(event.target.value);
    }

    //Get All DropDowns
    getIDQualifier() {
        this.systemCode
            .getSystemCodesByLangAndtype("PROCD_QUAL", "0")
            .subscribe((data) => {
                this.IdQualifier = data;
            });
    }

    GetHoldReason() {
        this.ReasonCodeMasterService.getReasonCodeMasterByReasonType(
            "HD"
        ).subscribe((data) => {
            this.holdReasons = data;
            this.holdReasons.sort(function (a, b) {
                if (a.reasonCode < b.reasonCode) {
                    return -1;
                }
                if (a.reasonCode > b.reasonCode) {
                    return 1;
                }
                return 0;
            });
        });
    }

    GetAllowedReason() {
        this.ReasonCodeMasterService.getReasonCodeMasterByReasonType(
            "AL"
        ).subscribe((data) => {
            this.allowedReason = data;
            this.allowedReason.sort(function (a: any, b: any) {
                if (a.reasonCode < b.reasonCode) {
                    return -1;
                }
                if (a.reasonCode > b.reasonCode) {
                    return 1;
                }
                return 0;
            });
        });
    }

    GetCodeClass() {
        this.DddwDtlService.findByColumnNameAndDwname(
            "code_class",
            "dw_procd_de"
        ).subscribe((data) => {
            this.CodeClass = data;
        });
    }

    GetAsterikProcedure() {
        this.DddwDtlService.findByColumnNameAndDwname(
            "asterisk_procedure",
            "dw_procd_de"
        ).subscribe((data) => {
            this.asterikProcedure = data;
        });
    }

    getCountAsDays() {
        this.DddwDtlService.findByColumnNameAndDwname(
            "count_as_days",
            "dw_procd_de"
        ).subscribe((data) => {
            this.countAsDays = data;
        });
    }

    getGenderPaitent() {
        this.DddwDtlService.findByColumnNameAndDwname(
            "patient_gender",
            "dw_procd_de"
        ).subscribe((data) => {
            this.genderPaitent = data;
        });
    }

    //Validations

    ValidateFollowUpDate(event: any) {
        if (event.target.value < 0 || event.target.value > 999) {
            this.ShowError(5527, false);

            this.FollowUpDaysError = true;
        } else {
            this.FollowUpDaysError = false;
        }
    }

    ValidateCountAsDate(event: any) {
        if (event.target.value == "Y" || event.target.value == "N") {
            this.CountAsError = false;
        } else {
            this.ShowError(5528, false);

            this.CountAsError = true;
        }
    }

    ValidateAstericProcedure(event: any) {
        if (event.target.value != "Y" || event.target.value != "N") {
            this.ShowError(5526, false);
            this.asterikProError = true;
        } else {
            this.asterikProError = false;
        }
    }

    ValidateFromAge(event: any) {
        if (
            parseFloat(event.target.value) < 0 ||
            parseFloat(event.target.value) > 999.9
        ) {
            this.ShowError(5534, false);

            this.FromAgeError = true;
        } else {
            if (this.procedureCodeForm.get("ageTo").value > 0) {
                if (event.target.value == null || event.target.value == "") {
                    this.ShowError(5535, false);
                    this.ageToNullError = true;
                } else if (
                    this.procedureCodeForm.get("toAge").value < event.target.value
                ) {
                    this.ShowError(5536, false);
                    this.ageToLessThenAgeFromError = true;
                    this.ageToNullError = false;
                } else {
                    this.ageToLessThenAgeFromError = false;
                    this.ageToNullError = false;
                }
            } else {
                this.ageToLessThenAgeFromError = false;
                this.ageToNullError = false;
            }
            this.FromAgeError = false;
        }
    }

    ValidateToAge(event: any) {
        if (
            parseFloat(event.target.value) < 0 ||
            parseFloat(event.target.value) > 999.9
        ) {
            this.ShowError(5537, false);

            this.ToAgeError = true;
        } else {
            if (this.procedureCodeForm.get("fromAge").value > 0) {
                if (
                    this.procedureCodeForm.get("fromAge").value == null ||
                    (this.procedureCodeForm.get("fromAge").value == 0 &&
                        event.target.value) != null
                ) {
                    this.procedureCodeForm.patchValue({
                        fromAge: 0,
                    });
                }
                if (
                    this.procedureCodeForm.get("fromAge").value >= 0 &&
                    event.target.value != null
                ) {
                    if (
                        this.procedureCodeForm.get("fromAge").value > event.target.value
                    ) {
                        this.ShowError(5538, false);
                        this.fromAgeGreaterError = true;
                    } else {
                        this.fromAgeGreaterError = false;
                    }
                } else {
                    this.fromAgeGreaterError = false;
                }
            } else {
                this.fromAgeGreaterError = false;
            }
            this.ToAgeError = false;
        }
    }

    datesCheck() {
        this.procedureCodeForm.get("termDate").valueChanges.subscribe((value) => {
            const effD = this.procedureCodeForm.value.effectiveDate;
            let dateEffecDefault = null;
            if (effD && effD.singleDate) {
                const newDate =
                    effD.singleDate.date.month +
                    "/" +
                    effD.singleDate.date.day +
                    "/" +
                    effD.singleDate.date.year;
                dateEffecDefault = new Date(newDate);
            }

            let termDate = null;
            if (value && value.singleDate) {
                termDate = new Date(value.singleDate.jsDate);
            }
            // =====================================        =============================
            if (dateEffecDefault && termDate) {
                if (termDate < dateEffecDefault) {
                    this.ShowError(5540, false);
                    this.termDateError = true;
                } else {
                    this.termDateError = false;
                }
            }
        });

        this.procedureCodeForm
            .get("effectiveDate")
            .valueChanges.subscribe((value) => {
                const termD = this.procedureCodeForm.value.termDate;
                if (termD && termD !== "") {
                    const termDate = new Date(termD.singleDate.jsDate);
                    const effDate = new Date(value.singleDate.jsDate);
                    if (value && termDate && effDate > termDate) {
                        this.ShowError(5539, false);
                        this.effectiveDateError = true;
                    } else {
                        this.effectiveDateError = false;
                    }
                }
            });
    }

    ShowError(number: any, check: any, value = "1") {
        if (check) {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ":" + message[0].messageText.replace("1@", value),
                        "Procedure Code"
                    );
                });
        } else {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ":" + message[0].messageText,
                        "Procedure Code"
                    );
                });
        }
    }

    ValidateUserDate1(event: any) {
        if (new Date(event.target.value) < new Date()) {
            this.showPopUp(
                'Procedure Code","Med Mgmt Effective Date should be current or future date',
                "Procedure Code"
            );
            this.termDateError = true;
        } else {
            this.termDateError = false;
        }
    }

    allRowValidations(): boolean {
        var ls_code = this.procedureCodeForm.get("holdReason").value;
        var hold_date = this.procedureCodeForm.get("holdDate").value;

        if (ls_code != null && ls_code.charAt(0) != "") {
            if (new Date(hold_date) < new Date("1900/01/01") || hold_date == null) {
                this.ShowError(5570, false);
                return false;
            }
        }

        ls_code = this.procedureCodeMaster.blockIndicator;
        var ls_proc = this.procedureCodeMaster.blockStartProc;

        if (ls_code != null && ls_code == "S") {
            if (ls_code == null || ls_proc.length < 1 || ls_code.charAt(0) == "") {
                this.ShowError(5658, false);
                return false;
            }
        }

        var ls_trg_rev_flg = this.procedureCodeForm.get("targetRevenueCode").value;

        if (ls_trg_rev_flg == "Y") {
            if (
                this.getProcedureDeterCount(this.procedureCodeMaster.procedureCode) ==
                -1
            ) {
                this.ShowError(5671, false);
                return false;
            }
        }
        return true;
    }

    onHoldReasonChange(event: any) {
        this.procedureCodeForm.get("holdDate").enable();
    }

    getProcedureDeterCount(id: any) {
        this.ProcedureDeterminantService.findByProcedureCode(id).subscribe(
            (data) => {
                if (data) {
                    return 1;
                } else {
                    return 0;
                }
            },
            (error) => {
                return 0;
            }
        );
        return 0;
    }

    checkBeforeSave() {
        if (this.FollowUpDaysError) {
            this.ShowError(5527, false);
            return true;
        }
        if (this.asterikProError) {
            this.ShowError(5528, false);
            return true;
        }
        if (this.asterikProError) {
            this.ShowError(5526, false);
            return true;
        }
        if (this.FromAgeError) {
            this.ShowError(5534, false);
            return true;
        }
        if (this.ageToNullError) {
            this.ShowError(5535, false);
            return true;
        }
        if (this.ageToLessThenAgeFromError) {
            this.ShowError(5536, false);
            return true;
        }
        if (this.ToAgeError) {
            this.ShowError(5537, false);
            return true;
        }
        if (this.fromAgeGreaterError) {
            this.ShowError(5538, false);
            return true;
        }
        if (this.termDateError) {
            this.ShowError(5540, false);
            return true;
        }
        if (this.effectiveDateError) {
            this.ShowError(5539, false);
            return true;
        }
        if (this.termDateError) {
            this.showPopUp(
                'Procedure Code","Med Mgmt Effective Date should be current or future date',
                "Procedure Code"
            );
            return true;
        }
        return false;
    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New", shortcutKey: 'Ctrl+M' },
                    { name: "Open", shortcutKey: 'Ctrl+O' },
                    { name: "Save", shortcutKey: 'Ctrl+S' },
                    { name: "Close", shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: "Main Menu...", shortcutKey: 'F2' },
                    { name: "Shortcut Menu...", shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: 'Alt+F4' },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", shortcutKey: 'Ctrl+Z' },
                    { isHorizontal: true },
                    { name: "Cut", shortcutKey: 'Ctrl+X', disabled: true },
                    { name: "Copy", shortcutKey: 'Ctrl+C', disabled: true },
                    { name: "Paste", shortcutKey: 'Ctrl+V', disabled: true },
                    { isHorizontal: true },
                    { name: "Lookup", shortcutKey: 'F5' },
                ],
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    { name: "Master File" },
                    { name: "Price File" },
                    { name: "Unit Values" },
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    { name: "Procedure Lookup" },
                    { name: "Procedure Determinant" },
                    { name: "Med Mgmt Audit" },
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: 'Shift+Alt+S' },
                    { name: "Audit Display", shortcutKey: 'Shift+Alt+A' },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Procedure Code" },
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    { name: "Contents" },
                    { name: "Search for Help on..." },
                    { name: "This Window", shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: "Glossary" },
                    { name: "Getting Started" },
                    { name: "How to use Help" },
                    { isHorizontal: true },
                    { name: "About Diamond Client/Server" },
                ],
            },
        ];
    }

    resetAll() {
        if (this.isSuperUser) {
            this.procedureCodeForm.reset();
            this.editProcedureCodeMaster = false;
            this.showProcedureCodeFields = false;
            this.isEditStatus=false;
            this.procedureCodeForm.get("procedureCode").enable();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.procedureCodeForm.reset();
                this.editProcedureCodeMaster = false;
                this.showProcedureCodeFields = false;
                this.procedureCodeForm.get("procedureCode").enable();
                this.isEditStatus=false;
            }
             else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Procedure Code')
                });
            }
        }
    }

    onMenuItemClick(eve: any) {
        if (eve.menu.menuItem === "File") {
            // handle File actions
            switch (eve.action) {
                case "New": {
                    //this.showForm = true;
                    this.resetAll();
                    break;
                }
                case "Open": {
                    this.resetAll();
                    break;
                }
                case "Save": {
                 this.saveProcedureCodeMaster();
                    break;
                }
                case "Close": {
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }

                default: {
                    // this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (eve.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            //this.handleEditMenu(event.action);
        } else if (eve.menu.menuItem === "Topic") {
            // handle Topic-Menu Actions
            this.sharedService.onProcedureCodeMenuClick(
                eve.action,
                "Procedure Code",
                this.activeModal,
                this.procedureCodeMaster.procedureCode
            );
            //this.handleTopicMenu(event.action);
        } else if (eve.menu.menuItem === "Special") {
            // handle special-Menu Actions
            this.handleSpecialMenu(eve.action);
        } else if (eve.menu.menuItem === "Windows") {
            switch (eve.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Audit Display": {
                }
            }
        } else if (eve.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case "Procedure Lookup": {
                this.openLookupFieldSearchModel();
                break;
            }
            case "Procedure Determinant": {
                this.OpenProcedureDet();
                break;
            }
            case "Med Mgmt Audit": {
                this.openMedMgmt();
                break;
            }
            default: {
                this.toastService.showToast(
                    "This option is not implemented yet",
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    openMedMgmt() {
        if (!this.procedureCodeMaster.procedureCode) {
            this.showPopUp(
                " A Valid Procedure Code has not been selected. ",
                " Med Mgmt Audit"
            );
            return;
        } else {
            let ref = this.modalService.open(MedMgmtAuditComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.procedureCode = this.procedureCodeMaster.procedureCode;
        }
    }

    OpenProcedureDet() {
        if (!this.procedureCodeMaster.procedureCode) {
            this.messageService
                .findByMessageId(5670)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "5670 : " + message[0].messageText.replace("@1", "Procedure Code"),
                        "Vendor"
                    );
                });
            return;
        } else {
            let ref = this.modalService.open(ProcedureDeterminantComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.procedureCode = this.procedureCodeMaster.procedureCode;
        }
    }

    onProcedureCodeKeyDown(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.procedureCodeSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.procedureCodeForm
                        .get("procedureCode")
                        .setValue(res.procedureCode);
                    this.GetAllFormData(res.procedureCode);
                }
            });
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(5555).subscribe(res => {
                    this.showPopUp('5555: ' + res[0].messageText, 'Procedure')
                })
            } else {
                this.GetAllFormData(event.target.value);
            }
        }
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.procedureCodeSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.procedureCodeForm.get("procedureCode").setValue(res.procedureCode);
                this.GetAllFormData(res.procedureCode);
            }
        });
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Procedure Code')
            })
        }
        else {
            this.activeModal.close();
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
                    this.saveProcedureCodeMaster()
                }
                else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.procedureCodeForm.controls[fieldName].patchValue(fieldValue);
    }

    isFormDataChanged = () => {
        this.procedureCodeForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(PricingHelpComponent, { windowClass: "myCustomModalClass" });
        viewModal.componentInstance.defaultFile = 'PROCD_Procedure_Codes.htm'
    }

    formPopupAlert = (message: string, title: string) => {
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
}
