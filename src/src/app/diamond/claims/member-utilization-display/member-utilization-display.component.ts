/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Input,
    Output,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ValidatorFn} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {MemberMaster, MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SearchModel} from '../../../shared/models/models';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {CONSTANTS} from '../../../shared/services/shared.service';
import {NgbToastType} from 'ngb-toast';
import {DatePipe} from '@angular/common';
import {CountryService} from '../../../api-services/country.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {MemberMasterService} from '../../../api-services/member-master.service';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {Form} from "../../../shared/helpers/form.helper";

// Use the Component directive to define the MemberUtilizationDisplayComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "memberutilizationdisplay",
    templateUrl: "./member-utilization-display.component.html",
    styleUrls: ["./member-utilization-display.component.css"],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DddwDtlService,
        CountryService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService,
    ],
})
export class MemberUtilizationDisplayComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() memberUtilizationDisplayForm: FormGroup;
    @Input() displayClaimTypeDDl: boolean = true;
    @Input() dateOfSvcLabl: string = "From Date Of Svc";
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = "AUDSP";
    public isSuperUser = false;
    public secProgress = true;
    claims: any[] = [];
    userTemplateId: string;
    loaderValue: boolean = false;

    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;
    @Output() utilizedData = new EventEmitter<any>();
    searchModel = new SearchModel(
        "membermasters/lookup",
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );
    memberMaster: MemberMaster;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    isChildModalOpen: boolean;

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
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private dddwDtlService: DddwDtlService,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal,
        public memberMasterService: MemberMasterService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberUtilizationDisplayForm);
    }

    private initializeComponentState(): void {
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberUtilizationDisplayForm);
        this.getClaims();
    }

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
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

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
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.secProgress = false;
                    this.initializeComponentState();
                } else {
                    this.showPopUp(
                        "You are not Permitted to view",
                        "Member Utilization Display"
                    );
                }
            },
            (error) => {
                this.secProgress = false;
            }
        );
    }

    getClaims() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.FILE_TYPE,
                CONSTANTS.DW_RESPONSE_CLDSP_DE
            )
            .subscribe((claims) => {
                this.claims = claims;
            });
    }

    onLookupFieldChange(event: any, id: any) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
        if (event.target.id == "personNumber" && event.key === "Tab") {
            this.loaderValue = true;
            event.preventDefault();
            this.memberMasterService
                .findBySubscriberIdAndPersonNumber(id, event.target.value)
                .subscribe((res: any) => {
                    this.loaderValue = false;
                    if (res && res.length > 0) {
                        let resp = res[0];
                        this.memberUtilizationDisplayForm.patchValue({
                            seqMembId: resp.seqMembId,
                            seqSubsId: resp.seqSubsId,
                            diamondId: resp.diamondId,
                            subscriberId: resp.subscriberId,
                            personNumber: resp.personNumber,
                            memberName: resp.lastName + ", " + resp.firstName,
                        });
                        this.memberMaster = resp;
                        this.popUpMessage = null;
                    }
                });
        }
    }

    onLookupFieldChangeSub(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
        if (event.key === "Tab") {
            this.onSubscriberIdBlue(event);
        }
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        this.isChildModalOpen = true;
        let ref = this.modalService.open(LookupComponent, {
            size: <any>"m",
            beforeDismiss: () => {
                this.isChildModalOpen = false;
                return true;
            },
        });
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberUtilizationDisplayForm.patchValue({
                seqMembId: res.seqMembId,
                seqSubsId: res.seqSubsId,
                diamondId: res.diamondId,
                subscriberId: res.subscriberId,
                personNumber: res.personNumber,
                memberName: res.lastName + ", " + res.firstName,
            });
            this.memberMaster = res;
            this.popUpMessage = null;
        });
    }

    getFormData() {
        let data: any = {
            seqMembId: this.memberUtilizationDisplayForm.get("seqMembId").value,
            seqSubsId: this.memberUtilizationDisplayForm.get("seqSubsId").value,
            diamondId: this.memberUtilizationDisplayForm.get("diamondId").value,
            subscriberId: this.memberUtilizationDisplayForm.get("subscriberId").value,
            personNumber: this.memberUtilizationDisplayForm.get("personNumber").value,
            memberName: this.memberUtilizationDisplayForm.get("memberName").value,
            claimType: this.memberUtilizationDisplayForm.get("claimType").value,
            fromDateOfSvc: Form.getDatePickerValue(this.memberUtilizationDisplayForm, 'fromDateOfSvc')
        };
        return data;
    }

    onSubmitForm() {
        this.formValidation.validateForm();
        if (this.memberUtilizationDisplayForm.valid) {
            let data: any = this.getFormData();
            this.utilizedData.emit(data);
            this.activeModal.close({
                memberUtilizationDisplayForm: this.memberUtilizationDisplayForm,
                memberUtilizationDisplayFormData: this.getFormData(),
                memberMaster: this.memberMaster,
            });
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    backToScreen() {
        this.activeModal.close({
            memberUtilizationDisplayForm: this.memberUtilizationDisplayForm,
            memberUtilizationDisplayFormData: this.getFormData(),
            memberMaster: this.memberMaster,
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberUtilizationDisplayForm = this.formBuilder.group(
            {
                seqMembId: ["", {updateOn: "blur", validators: []}],
                seqSubsId: ["", {updateOn: "blur", validators: []}],
                memberName: ["", {updateOn: "blur", validators: []}],
                diamondId: ["", {updateOn: "blur", validators: []}],
                subscriberId: [
                    "",
                    {updateOn: "blur", validators: [Validators.required]},
                ],
                personNumber: [
                    "",
                    {updateOn: "blur", validators: [Validators.required]},
                ],
                claimType: [
                    "",
                    {updateOn: "blur", validators: [this.getValidator()]},
                ],
                fromDateOfSvc: ["", {updateOn: "blur", validators: []}],
            },
            {updateOn: "submit"}
        );
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getValidator(): ValidatorFn {
        if (this.displayClaimTypeDDl) {
            return Validators.required;
        }
        return Validators.nullValidator;
    }

    onSubscriberIdBlue = (event: any) => {
        if (event.target.value && !this.loaderValue) {
            this.loaderValue = true;
            this.memberMasterService.findBySubscriberId(event.target.value)
                .subscribe((res: any) => {
                    this.loaderValue = false;
                    if (res && res.length > 0) {
                        let resp = res[0];
                        this.memberUtilizationDisplayForm.patchValue({
                            seqMembId: resp.seqMembId,
                            seqSubsId: resp.seqSubsId,
                            diamondId: resp.diamondId,
                            subscriberId: resp.subscriberId,
                            // personNumber: resp.personNumber,
                            memberName: resp.lastName + ", " + resp.firstName,
                        });
                        this.memberUtilizationDisplayForm.get("personNumber").setValue("");
                        this.memberMaster = resp;
                        this.popUpMessage = null;
                    }
                    else {
                        this.messageService
                            .findByMessageId(7128)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.showPopUp(
                                    "7128:" + message[0].messageText,
                                    "Member Utilization"
                                );
                                this.memberUtilizationDisplayForm.get("subscriberId").setValue("");
                            });
                    }
                });
        }
    };

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.loaderValue = false;
            return;
        }
    }
}
