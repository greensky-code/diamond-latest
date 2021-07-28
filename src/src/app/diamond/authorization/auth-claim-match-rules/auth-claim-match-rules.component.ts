/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from "ag-grid-community";
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message/index";
import {DatePickerConfig, DatePickerModel} from "../../../shared/config";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {AuthClaimMatchRules} from "../../../api-models/authorization/auth-claim-match-rules.model";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {Mask} from "../../../shared/pipes/text-format.pipe";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthClaimMatchRulesService} from "../../../api-services/authorization/auth-claim-match-rules.service";
import {DddwDtl, DeterminantTables, MessageMasterDtl, SecUser, SecWin, SystemCodes} from "../../../api-models";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {DddwDtlService, MessageMasterDtlService, SecUserService, SystemCodesService} from "../../../api-services";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {DEFAULT_LANGUAGE, SYSTEM_CODE_ADV_PAY_TYPE, SYSTEM_CODE_CLAIM_TYPE} from "../../../shared/models/constants";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {CONSTANTS} from "../../../shared/services/shared.service";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {Menu} from "../../../shared/models/models";

// Use the Component directive to define the AuthClaimMatchRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authclaimmatchrules',
    templateUrl: './auth-claim-match-rules.component.html',
    styleUrls: ['./auth-claim-match-rules.component.scss']


})
export class AuthClaimMatchRulesComponent implements OnInit {

    authClaimMatchRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';

    public isSuperUser = false;
    public secProgress = true;
    userTemplateId: string;

    claimTypes: any;
    authStatus: any;
    authLevels: any;
    action: any;


    characterCount: any;

    secColDetails = new Array<SecColDetail>();
    inProgress = true;

    searchStatus: boolean = false;
    keyNames: string = "subscriber_id";
    keyValues: any;

    provider: string;
    procedureCode: string;
    benefitPackage: string;

    menu: Menu[] = [];

    @Input() showIcon: boolean = false;
    @Input() winID?: string;


    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

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

    editAuthClaimMatchRules: boolean;
    authClaimMatchRules: AuthClaimMatchRules;
    authClaimMatchRuleses: AuthClaimMatchRules[];


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Line Of Business",
                field: "authClaimMatchRulesPrimaryKey.lineOfBusiness",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Claim Type",
                field: "authClaimMatchRulesPrimaryKey.claimType",
                width: 200
            },
            {
                headerName: "Match Order",
                field: "authClaimMatchRulesPrimaryKey.matchOrder",
                width: 200
            },
            {
                headerName: "Description",
                field: "description",
                width: 200
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private router: Router,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private authClaimMatchRulesService: AuthClaimMatchRulesService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal
    ) {
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

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
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
                        'You are not Permitted to view Benefit Ruler',
                        'Benefit Rule Permission'
                    );
                }
            }
        );
    }

    private initializeComponentState(): void {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authClaimMatchRulesForm);
        this.createDataGrid();
        this.populateDropDowns()

        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        });

        this.populateGrid();
    }


    createForm() {
        this.authClaimMatchRulesForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: []}],
            authPlaceOfSvc: ['', {updateOn: 'blur', validators: []}],
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            claimType: ['', {updateOn: 'blur', validators: []}],
            authStatus: ['', {updateOn: 'blur', validators: [Validators.maxLength(2)]}],
            matchOrder: ['', {updateOn: 'blur', validators: []}],
            authLevel: ['', {updateOn: 'blur', validators: [Validators.maxLength(1)]}],
            description: ['', {updateOn: 'blur', validators: []}],
            diamondId: ['', {updateOn: 'blur', validators: []}],
            diagnosis: ['', {updateOn: 'blur', validators: []}],
            matchFirst: ['', {updateOn: 'blur', validators: []}],
            authNoMatch: ['', {updateOn: 'blur', validators: []}],
            claimPlaceOfSvc: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            provider: ['', {updateOn: 'blur', validators: []}],
            authclaimExactPlaceOfSvc: ['', {updateOn: 'blur', validators: []}],
            primarySpecialty: ['', {updateOn: 'blur', validators: []}],
            surgicalProc: ['', {updateOn: 'blur', validators: []}],
            vendorId: ['', {updateOn: 'blur', validators: []}],
            facultyId: ['', {updateOn: 'blur', validators: []}],
            primaryDos: ['', {updateOn: 'blur', validators: []}],
            authBeginDaysBefore: ['', {updateOn: 'blur', validators: [this.customValidators.number]}],
            thruDos: ['', {updateOn: 'blur', validators: []}],
            authEndDaysAfter: ['', {updateOn: 'blur', validators: [this.customValidators.number]}],
            action: ['', {updateOn: 'blur', validators: [Validators.maxLength(1)]}],
            reasonCode: ['', {updateOn: 'blur', validators: [Validators.maxLength(5)]}],
            applyAuthToClaim: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    onSelectionChanged(event: any) {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();

        console.log(selectedRows[0]);

        this.authClaimMatchRulesForm.patchValue({lineOfBusiness: selectedRows[0].authClaimMatchRulesPrimaryKey.lineOfBusiness});
        this.authClaimMatchRulesForm.patchValue({authPlaceOfSvc: selectedRows[0].authPlaceServiceUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({claimType: selectedRows[0].authClaimMatchRulesPrimaryKey.claimType});
        this.authClaimMatchRulesForm.patchValue({authStatus: selectedRows[0].authStatus});
        this.authClaimMatchRulesForm.patchValue({matchOrder: selectedRows[0].authClaimMatchRulesPrimaryKey.matchOrder});
        this.authClaimMatchRulesForm.patchValue({authLevel: selectedRows[0].authLevel});
        this.authClaimMatchRulesForm.patchValue({description: selectedRows[0].description});
        this.authClaimMatchRulesForm.patchValue({diamondId: selectedRows[0].diamondIdUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({diagnosis: selectedRows[0].diagnosisUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({matchFirst: selectedRows[0].matchFirstDigits});
        this.authClaimMatchRulesForm.patchValue({authNoMatch: selectedRows[0].authNumberMatch == 'Y'});
        this.authClaimMatchRulesForm.patchValue({claimPlaceOfSvc: selectedRows[0].claimPlaceServiceUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({provider: selectedRows[0].providerUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({authclaimExactPlaceOfSvc: selectedRows[0].exactPlaceServiceUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({primarySpecialty: selectedRows[0].primarySpecialtyUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({surgicalProc: selectedRows[0].surgeryProcUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({vendorId: selectedRows[0].vendorIdUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({facultyId: selectedRows[0].facilityIdUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({primaryDos: selectedRows[0].primaryDosUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({authBeginDaysBefore: selectedRows[0].authBeginDaysBefore});
        this.authClaimMatchRulesForm.patchValue({thruDos: selectedRows[0].thruDosUsed == 'Y'});
        this.authClaimMatchRulesForm.patchValue({authEndDaysAfter: selectedRows[0].authEndDaysAfter});
        this.authClaimMatchRulesForm.patchValue({action: selectedRows[0].action});
        this.authClaimMatchRulesForm.patchValue({reasonCode: selectedRows[0].reasonCode});
        this.authClaimMatchRulesForm.patchValue({applyAuthToClaim: selectedRows[0].applyAuthToClaim});
        this.characterCount = selectedRows[0].matchFirstDigits;


    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    private populateGrid() {
        this.authClaimMatchRulesService
            .getAuthClaimMatchRuleses()
            .subscribe(
                (authClaimMatchRule: AuthClaimMatchRules[]) => {
                    console.log(authClaimMatchRule);

                    this.dataGridGridOptions.api.setRowData(authClaimMatchRule);
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                }
            );
    }


    getClaimTypes() {
        this.systemCodesService
            .getSystemCodesByLangAndtype(SYSTEM_CODE_CLAIM_TYPE, DEFAULT_LANGUAGE)
            .subscribe(
                (systemCodes) => {
                    console.log(systemCodes);

                    this.claimTypes = systemCodes;
                }
            );
    }

    getAuthStatuses() {
        this.dddwDtlService
            .findByColumnNameAndDwnameAndLanguageId('auth_status', 'dw_mchrl_de', 0)
            .subscribe(
                (systemCodes: any[]) => {
                    this.authStatus = systemCodes;
                }
            );
    }

    getAction() {
        this.dddwDtlService
            .findByColumnNameAndDwnameAndLanguageId('action', 'dw_mchrl_de', 0)
            .subscribe(
                (systemCodes: any[]) => {
                    this.action = systemCodes;
                }
            );
    }

    getAuthLevels() {
        this.systemCodesService
            .getSystemCodesByLangAndtype('AUTHLEVEL', DEFAULT_LANGUAGE)
            .subscribe(
                (systemCodes) => {
                    console.log(systemCodes);

                    this.authLevels = systemCodes;
                }
            );
    }

    private populateDropDowns() {
        this.getAuthStatuses();
        this.getClaimTypes();
        this.getAuthLevels();
        this.getAction();
    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New"},
                    {name: "Open"},
                    {name: "Save"},
                    {name: "Close"},
                    {name: "-"},
                    {name: "Main Menu"},
                    {name: "Shortcut Menu"},
                    {isHorizontal: true},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit"},
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: "Undo", disabled: true},
                    {isHorizontal: true},
                    {name: "Cut", disabled: true},
                    {name: "Copy", disabled: true},
                    {name: "Paste", disabled: true},
                    {isHorizontal: true},
                    {name: "Next"},
                    {name: "Previous"},
                    {isHorizontal: true},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Place of Service Codes", disabled: true}
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{name: "Notes", shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    {name: "Tile"},
                    {name: "Layer"},
                    {name: "Cascade"},
                    {name: "Arrange Icons"},
                    {isHorizontal: true},
                    {name: "Show Timestamp"},
                    {name: "Audit Display"},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Auth/Claim Match Rules"},
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    {name: "Contents"},
                    {name: "Search for Help on..."},
                    {name: "This Window"},
                    {isHorizontal: true},
                    {name: "Glossary"},
                    {name: "Getting Started"},
                    {name: "How to use Help"},
                    {isHorizontal: true},
                    {name: "About Diamond Client/Server"},
                ],
            },
        ];
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "Special") {
            // handle File actions
            switch (event.action) {
                default: {
                    this.toastService.showToast(
                        "Action is in progress",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Audit Display": {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(
                            CONSTANTS.F_AUDIT,
                            this.winID
                        );
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, {
                                size: "lg",
                            });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService
                                .findByMessageId(11073)
                                .subscribe((message: MessageMasterDtl[]) => {
                                    this.alertMessage = this.alertMessageService.error(
                                        "11073: " + message[0].messageText
                                    );
                                });
                        }
                    } else {
                        this.messageService
                            .findByMessageId(30164)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error(
                                    "30164: " + message[0].messageText
                                );
                            });
                    }

                    break;
                }
            }
        } else {
            // handle Edit-Menu Actions
            this.toastService.showToast("Action is in progress", NgbToastType.Danger);
        }
    }

}
