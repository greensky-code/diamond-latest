/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    ArAdjustment,
    CompanyMaster,
    DddwDtl,
    GeneralLedgerReference,
    MessageMasterDtl,
    ReasonCodeMaster
} from '../../../api-models/index'
import {ArAdjustmentService} from '../../../api-services/ar-adjustment.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {
    CompanyMasterService,
    DddwDtlService,
    GeneralLedgerReferenceService,
    MessageMasterDtlService,
    ReasonCodeMasterService,
    SecUserService
} from '../../../api-services';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Menu, SearchModel} from '../../../shared/models/models';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {CONSTANTS, getArAdjustmentShortcutKeys} from '../../../shared/services/shared.service';
import {UntilDestroy} from '@ngneat/until-destroy';
import {ArAdjustmentsLookup} from '../../../shared/lookup/ar-adjustments-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ReportService} from '../../../core';
import {ArAdjustmentsGlMonthComponent} from '../ar-adjustments-gl-month/ar-adjustments-gl-month.component';
import {CustomerSelectLookup} from '../../../shared/lookup/customer-select-lookup';
import {PmbArCustomerMasterService} from "../../../api-services/pmb-ar-customer-master.service";
import {Router} from "@angular/router";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {PremiumHelpComponent} from "../premium-help/premium-help.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {
    ACCESS_TOKEN,
    AUTHENTICATED_USER,
    AuthenticationService,
    REFRESH_TOKEN
} from "../../../api-services/authentication.service";
// Use the Component directive to define the ArAdjustmentsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({checkProperties: true})
@Component({

    selector: 'aradjustments',
    templateUrl: './ar-adjustments.component.html',
    providers: [
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecWinService,
        SecurityService,
        ArAdjustmentService,
        PmbArCustomerMasterService,
    ]

})
export class ArAdjustmentsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    arAdjustmentsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'ARADJ';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    editArAdjustment: boolean;
    arAdjustment: ArAdjustment;
    arAdjustments: ArAdjustment[];
    secColDetails = new Array<SecColDetail>();
    private dataLoadedMap = new Map<string, boolean>();
    public shortcuts: ShortcutInput[] = [];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    customerTypes: DddwDtl[] = [];
    reasonCodeValues: ReasonCodeMaster[];
    companyCodes: DddwDtl[] = [];
    generalRef: GeneralLedgerReference[] = [];
    companyMasters: CompanyMaster[] = [];
    selectedGeneralRef: GeneralLedgerReference[];
    valueChanged: Boolean = false;
    screenCloseRequest: Boolean = false;
    showArAdjustmentField = false;
    statementStatusValues: any[] = [];


    searchModel =
        new SearchModel('aradjustments/lookup', ArAdjustmentsLookup.AR_ADJUSTMENTS__ALL,
            ArAdjustmentsLookup.AR_ADJUSTMENTS_DEFAULT, [], false);
    searchCustomerModel = new SearchModel(
        'pmbarcustomermasters/lookup',
        CustomerSelectLookup.CUSTOMER_SELECT_ALL,
        CustomerSelectLookup.CUSTOMER_SELECT_DEFAULT,
        []
    );

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


    openArAdjustmentLookup() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: ArAdjustment) => {
            this.getArAdjustment(res.seqAradjId);
        });
    }


    openArAdjustmentCustomerLookup() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchCustomerModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.arAdjustmentsForm.patchValue({
                    'customerType': res.pmbArCustomerMasterPrimaryKey.customerType,
                    'customerId': res.pmbArCustomerMasterPrimaryKey.customerId,
                    'dynamicText': res.shortName
                }, {emitEvent: false, onlySelf: true});
                this.valueChanged = false;
            }
        });

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
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }


    createArAdjustment() {
        if (true || this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.arAdjustmentsForm.valid) {
                this.checkGlrefCode()
                let arAdjustment = new ArAdjustment();
                arAdjustment.customerId = Form.getValue(this.arAdjustmentsForm, 'customerId');
                arAdjustment.customerType = Form.getValue(this.arAdjustmentsForm, 'customerType');
                arAdjustment.seqAradjId = Form.getValue(this.arAdjustmentsForm, 'arAdjustmentId');
                arAdjustment.transDate = Form.getDatePickerValue(this.arAdjustmentsForm, 'transactionDate');
                arAdjustment.transAmt = Form.getValue(this.arAdjustmentsForm, 'transactionAmt');
                arAdjustment.glRefCode = Form.getValue(this.arAdjustmentsForm, 'glRefCode');
                arAdjustment.statementStatus = Form.getValue(this.arAdjustmentsForm, 'statementStatus');
                arAdjustment.invoiceNo = Form.getValue(this.arAdjustmentsForm, 'invoiceNumber');
                arAdjustment.postDate = Form.getValue(this.arAdjustmentsForm, 'postDate');
                arAdjustment.companyCode = Form.getValue(this.arAdjustmentsForm, 'companyCode');
                arAdjustment.adjReason = Form.getValue(this.arAdjustmentsForm, 'reasonCode');
                arAdjustment.transDesc = Form.getValue(this.arAdjustmentsForm, 'comments');
                this.arAdjustmentService.createArAdjustment(arAdjustment).subscribe(response => {
                    this.editArAdjustment = false;
                    this.toastService.showToast('Record successfully created', NgbToastType.Success);
                    this.arAdjustmentsForm.reset();
                    this.getArAdjustment(arAdjustment.seqAradjId);
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.valueChanged = false;
                }, error => {

                });
            }
        }
    }

    updateArAdjustment(seqAradjId: number) {
        if (true || this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.arAdjustmentsForm.valid) {
                if (this.valueChanged) {
                    if(this.checkGlrefCode()){

                    }
                }
                let arAdjustment = new ArAdjustment();
                arAdjustment.customerId = Form.getValue(this.arAdjustmentsForm, 'customerId');
                arAdjustment.customerType = Form.getValue(this.arAdjustmentsForm, 'customerType');
                arAdjustment.seqAradjId = Form.getValue(this.arAdjustmentsForm, 'arAdjustmentId');
                arAdjustment.transDate = Form.getDatePickerValue(this.arAdjustmentsForm, 'transactionDate');
                arAdjustment.transAmt = Form.getValue(this.arAdjustmentsForm, 'transactionAmt');
                arAdjustment.glRefCode = Form.getValue(this.arAdjustmentsForm, 'glRefCode');
                arAdjustment.statementStatus = Form.getValue(this.arAdjustmentsForm, 'statementStatus');
                arAdjustment.invoiceNo = Form.getValue(this.arAdjustmentsForm, 'invoiceNumber');
                arAdjustment.postDate = Form.getDatePickerValue(this.arAdjustmentsForm, 'postDate');
                arAdjustment.companyCode = Form.getValue(this.arAdjustmentsForm, 'companyCode');
                arAdjustment.adjReason = Form.getValue(this.arAdjustmentsForm, 'reasonCode');
                arAdjustment.transDesc = Form.getValue(this.arAdjustmentsForm, 'comments');
                this.arAdjustmentService.updateArAdjustment(arAdjustment, seqAradjId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editArAdjustment = false;
                    this.arAdjustmentsForm.reset();
                    this.getArAdjustment(seqAradjId);
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.valueChanged = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ',
                'Group Master Permissions');
        }
    }

    saveArAdjustment() {
        if (this.editArAdjustment) {
            this.updateArAdjustment(this.arAdjustment.seqAradjId)
        } else {
            this.createArAdjustment();
        }
    }

    deleteArAdjustment(seqAradjId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.arAdjustmentService.deleteArAdjustment(seqAradjId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getArAdjustment(seqAradjId: number) {
        this.arAdjustmentService.getArAdjustment(seqAradjId).subscribe(arAdjustment => {
            if (arAdjustment) {
                this.editArAdjustment = true;
                this.arAdjustmentsForm.get('arAdjustmentId').disable();
                this.showArAdjustmentField = true;
                this.arAdjustment = arAdjustment;
                this.selectedGeneralRef = this.generalRef.filter(data => this.arAdjustment.companyCode);
                this.arAdjustmentsForm.patchValue({
                    'arAdjustmentId': seqAradjId,
                    'customerType': this.arAdjustment.customerType,
                    'customerId': this.arAdjustment.customerId,
                    'transactionDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arAdjustment.transDate),
                    'transactionAmt': this.arAdjustment.transAmt,
                    'reasonCode': this.arAdjustment.adjReason,
                    'statementStatus': this.arAdjustment.statementStatus,
                    'invoiceNumber': this.arAdjustment.invoiceNo,
                    'postDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arAdjustment.postDate),
                    'companyCode': this.arAdjustment.companyCode,
                    'glRefCode': this.arAdjustment.glRefCode,
                    'dynamicText': this.arAdjustment.shortName,
                    'comments': this.arAdjustment.transDesc,
                }, {emitEvent: false, onlySelf: true});
                if (this.arAdjustment.postDate !== undefined) {
                    this.formDisabled()
                } else {
                    this.formEnabled()
                }
                this.valueChanged = false;
            } else {
                this.messageService.findByMessageId(1083).subscribe(res => {
                    this.showPopUp('1083: ' + res[0].messageText.replace("CTRL N", "CTRL M") , 'A/R Adjustments')
                    setTimeout(() => {
                        this.renderer.selectRootElement('#arAdjustmentId').focus()
                    }, 500)
                })
            }
        }, error => {
            this.messageService.findByMessageId(1083).subscribe(res => {
                this.showPopUp('1083: ' + res[0].messageText.replace("CTRL N", "CTRL M") , 'A/R Adjustments')
                setTimeout(() => {
                    this.renderer.selectRootElement('#arAdjustmentId').focus()
                }, 500)
            })
        });
    }

    getArAdjustments() {
        this.arAdjustmentService.getArAdjustments().subscribe(arAdjustments => {
            this.arAdjustments = arAdjustments;
            this.valueChanged = false;
        });
    }

    getArdjStatements() {
        this.dddwDtlService.findByColumnNameAndDwname('statement_status', 'dw_aradj_de').subscribe((values) => {
            values.sort((a, b) => {
                return a.dddwDtlPrimaryKey.dataVal > b.dddwDtlPrimaryKey.dataVal ? 1 : -1
            });
            this.statementStatusValues = values.map(value => {
                return {key: value.dddwDtlPrimaryKey.displayVal, value: value.dddwDtlPrimaryKey.dataVal}
            });
        });
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
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private companyMasterService: CompanyMasterService,
        private dddwDtlService: DddwDtlService,
        private generalLedgerReferenceService: GeneralLedgerReferenceService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private reportService: ReportService,
        private messageService: MessageMasterDtlService,
        private arAdjustmentService: ArAdjustmentService,
        private pmbArCustomerMasterService: PmbArCustomerMasterService,
        private renderer: Renderer2,
        private router: Router,
        ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getArAdjustmentShortcutKeys(this));
        this.cdr.detectChanges();
        this.arAdjustmentsForm.valueChanges.subscribe(() => {
            this.valueChanged = true;
        });
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
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.dataLoadedMap.set('WINPERMISSION', false);

        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
        if (this.isSuperUser) {
            this.initializeComponentState();
            this.dataLoadedMap.set('WINPERMISSION', true);
            return;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
                this.dataLoadedMap.set('WINPERMISSION', true);
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        }, error => {
            // console.log(error);
            this.initializeComponentState();
            this.dataLoadedMap.set('WINPERMISSION', true);
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arAdjustmentsForm);
        this.menuInit();
        this.getCustomerTypesDropDown();
        this.getReasonCodeValues();
        this.getCompanyMasters();
        this.getGeneral();
        this.getArdjStatements();

    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.arAdjustmentsForm = this.formBuilder.group({
            arAdjustmentId: ['', {updateOn: 'change', validators: []}],
            customerType: ['', {updateOn: 'blur', validators: []}],
            customerId: ['', {updateOn: 'blur', validators: []}],
            dynamicText: ['', {updateOn: 'blur', validators: []}],
            transactionDate: ['', {updateOn: 'blur', validators: []}],
            transactionAmt: ['', {updateOn: 'blur', validators: []}],
            reasonCode: ['', {updateOn: 'blur', validators: []}],
            statementStatus: ['', {updateOn: 'blur', validators: []}],
            invoiceNumber: ['', {updateOn: 'blur', validators: []}],
            postDate: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: []}],
            glRefCode: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}]
        },);
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    public onMenuItemClick(event: any): void {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.handleNewMenuClick();
                    break;
                }
                case 'Open': {
                      this.openScreen();
                    break;
                }
                case 'Save': {
                    this.saveArAdjustment();
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Shortcut Menu': {

                    break;
                }
                case 'Exit': {
                    this.exitScreen();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Window') {
            this.handleWindowScreen(event.action);
        } else if (event.menu.menuItem === 'Help') {
            this.handleHelpScreen();
        }
    }

    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                if (this.editArAdjustment) {
                    this.openArAdjustmentCustomerLookup();
                } else {
                    this.openArAdjustmentLookup();
                }
                break;
            }
            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Aradj Post': {
                const ref = this.modalService.open(ArAdjustmentsGlMonthComponent, {windowClass: 'input-class'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.title = 'A/R Adjustments GL Month';
                ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                    console.log(event);
                });

                break;
            }
            case 'Aradj Report By Customer': {
                let customerIds: string[] = [];
                let reportData: any[] = [];
                this.arAdjustmentService.getAradjReportData().subscribe(data => {
                    data.forEach((element: {
                        customerId: string;
                        date: string | { singleDate: { date: { year: number; month: number; day: number; }; }; };
                    }) => {
                        if (customerIds.indexOf(element.customerId) === -1) {
                            customerIds.push(element.customerId);
                        }
                        // element.date = this.dateFormatPipe.defaultDisplayDateFormat(element.date);
                    });
                    reportData = data;
                    this.reportService.arAdjustmentPostingReportByCustomerReport(customerIds, reportData);
                });
                break;
            }
            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }

    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M'},
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S'},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}
                ]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{name: 'Aradj Post'}, {name: 'Aradj Report By Customer'}
                ]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift+Alt+P'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 A/R Adjustments'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true}, {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    public get isDataLoaded(): boolean {
        // @ts-ignore
        for (let [key, value] of this.dataLoadedMap) {
            if (!value) {
                return value;
            }
        }
        return true;
    }

    openLookupFieldSearchModel(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openArAdjustmentLookup();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            const seqAradjId = event.target.value;
            if (seqAradjId !== '') {
                const regex = /\d/;
                const onlyNumber = regex.test(seqAradjId);
                if (onlyNumber) {
                    this.getArAdjustment(seqAradjId);
                } else {
                    this.messageService.findByMessageId(1083).subscribe(res => {
                        this.showPopUp('1083: ' + res[0].messageText.replace("CTRL N", "CTRL M") , 'A/R Adjustments')
                        setTimeout(() => {
                            this.renderer.selectRootElement('#arAdjustmentId').focus()
                        }, 500)
                    })
                }
            } else {
                this.messageService.findByMessageId(1083).subscribe(res => {
                    this.showPopUp('1083: ' + res[0].messageText.replace("CTRL N", "CTRL M") , 'A/R Adjustments')
                    setTimeout(() => {
                        this.renderer.selectRootElement('#arAdjustmentId').focus()
                    }, 500)
                })
            }
        }
    }

    openCustomerLookupFieldSearchModel(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openArAdjustmentCustomerLookup();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getPmbArCustomerMaster(id, this.arAdjustmentsForm.get('customerType').value);
        }
    }

    onChangeArAdjustmentId(event) {
        this.arAdjustmentsForm.patchValue({arAdjustmentId: event.target.value}, {emitEvent: false, onlySelf: true})
        this.getArAdjustment(event.target.value);
    }

    getCustomerTypesDropDown() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DW_COLUMN_CUSTOMER_TYPE, CONSTANTS.DW_ARADJ_DE).subscribe(dddwDtls => {
            this.customerTypes = dddwDtls;
        });
    }

    getCompanyCodesDropDown() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DW_COLUMN_COMPANY_CODE, CONSTANTS.DW_ARADJ_DE).subscribe(dddwDtls => {
            this.companyCodes = dddwDtls;
        });
    }

    getReasonCodeValues() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('AR').subscribe(resp => {
            this.reasonCodeValues = resp;
        })
    }

    getGeneral() {
        this.generalLedgerReferenceService.getGeneralLedgerReferences().subscribe(led => {
            this.generalRef = led;
        })
    }

    onCompanyCodeChange(event) {
        let value = event.target.value;
        this.selectedGeneralRef = [];
        let glRefCodeData: any[] = []
        this.generalRef.forEach(data => {
            if (data.companyCode === value && glRefCodeData.indexOf(data.generalLedgerReferencePrimaryKey.glRefCode) === -1) {
                glRefCodeData.push(data.generalLedgerReferencePrimaryKey.glRefCode);
                this.selectedGeneralRef.push(data);

            }
        });
        this.arAdjustmentsForm.get('glRefCode').enable();
    }

    private getCompanyMasters(): void {
        this.companyMasterService.getCompanyMasters().subscribe(companyMasters => {
            companyMasters.sort((a, b) => {
                if (a.companyCode < b.companyCode) {return -1}
                else if (a.companyCode > b.companyCode) {return 1}
                else {return 0}
            });
            this.companyMasters = companyMasters;
        })
    }

    modalClose() {
        this.screenCloseRequest = true;
        if (this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Group Detail')
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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveArAdjustment()
                }
                else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
        }
    };


    handleNewMenuClick() {
        this.arAdjustmentsForm.reset();
        let date = new Date;
        this.arAdjustmentsForm.enable();
        let dateFormatted = this.dateFormatPipe.defaultDisplayDateFormat(date);
        this.arAdjustmentService.getNextSequence().subscribe(nextSeq => {
            this.arAdjustmentsForm.patchValue({
                'arAdjustmentId': nextSeq,
                'statementStatus': '0',
                'transactionDate': dateFormatted
            }, {emitEvent: false, onlySelf: true});
            this.editArAdjustment = false;
            this.showArAdjustmentField = true;
            this.arAdjustmentsForm.get('arAdjustmentId').disable();
            this.arAdjustmentsForm.get('postDate').disable();
            this.arAdjustmentsForm.get('statementStatus').disable();
            this.arAdjustmentsForm.get('glRefCode').disable();
        });
    }

    formDisabled = () => {
        this.arAdjustmentsForm.get('customerType').disable();
        this.arAdjustmentsForm.get('customerId').disable();
        this.arAdjustmentsForm.get('transactionDate').disable();
        this.arAdjustmentsForm.get('transactionAmt').disable();
        this.arAdjustmentsForm.get('reasonCode').disable();
        this.arAdjustmentsForm.get('statementStatus').disable();
        this.arAdjustmentsForm.get('companyCode').disable();
        this.arAdjustmentsForm.get('glRefCode').disable();
        this.arAdjustmentsForm.get('comments').disable();
    };

    formEnabled = () => {
        this.arAdjustmentsForm.get('customerType').enable();
        this.arAdjustmentsForm.get('customerId').enable();
        this.arAdjustmentsForm.get('transactionDate').enable();
        this.arAdjustmentsForm.get('transactionAmt').enable();
        this.arAdjustmentsForm.get('reasonCode').enable();
        this.arAdjustmentsForm.get('statementStatus').enable();
        this.arAdjustmentsForm.get('companyCode').enable();
        this.arAdjustmentsForm.get('glRefCode').enable();
        this.arAdjustmentsForm.get('comments').enable();
    };

    getPmbArCustomerMaster(customerId: string, customerType: string) {
        this.pmbArCustomerMasterService
            .getPmbArCustomerMaster(customerId, customerType).subscribe((pmbArCustomerMaster) => {
                if (pmbArCustomerMaster) {
                    this.arAdjustmentsForm.patchValue({
                        customerId: customerId,
                        dynamicText: pmbArCustomerMaster.shortName,
                    });
                    const element = this.renderer.selectRootElement('#transactionDate').focus();
                } else {
                    this.messageService
                        .findByMessageId(1090)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                message[0].messageText,
                                "Select Customer"
                            );
                        });
                }
            },
            (error) => {
                this.messageService
                    .findByMessageId(1090)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(message[0].messageText, "Select Customer");
                    });
            }
        );
    }
    checkGlrefCode(){
        if (this.selectedGeneralRef) {
            for (var i = 0; i < this.selectedGeneralRef.length; i++) {
                if (
                    this.arAdjustmentsForm.get("glRefCode").value ==
                    this.selectedGeneralRef[i].generalLedgerReferencePrimaryKey
                        .glRefCode
                ) {
                    var desc = this.selectedGeneralRef[i].description;
                    if (desc.toUpperCase().indexOf("REV") == -1) {
                        this.showPopUp("G/L Code is Invalid ", "ARCSH");
                        return true;
                    }
                }
            }
            return false;
        } else {

        }
    }

    openScreen = () => {
        if (this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                if (!message) {
                    return;
                }
                let popUpMessage = new PopUpMessage('popUpMessageName', 'A/R Adjustments', message[0].messageText, 'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                    if (resp.name === 'Yes') {
                        this.saveArAdjustment()
                    }
                    else if (resp.name === 'No') {
                        this.showArAdjustmentField = false;
                        this.arAdjustmentsForm.reset();
                        this.arAdjustmentsForm.get('arAdjustmentId').enable()
                    }
                })
            })
        } else {
            this.showArAdjustmentField = false;
            this.arAdjustmentsForm.reset();
            this.arAdjustmentsForm.get('arAdjustmentId').enable()
        }
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
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
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
            if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'r':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Aradj Report By Customer'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Aradj Post'
                        }
                        this.onMenuItemClick(obj)
                }
            } else if (this.menuOpened == "fileDropdownWindow") {
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
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Processing Messages'
                        }
                        this.onMenuItemClick(obj)
                }
            } else if (this.menuOpened == "fileDropdownHelp") {
                switch (value) {
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Contents'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Search for Help on..'
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
                        this.onMenuItemClick(obj)
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
                        this.onMenuItemClick(obj)
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
                    default:
                        break;
                }
            }
        }
    }

    handleHelpScreen = () => {
        const modalRef = this.modalService.open(PremiumHelpComponent, {
            windowClass: "myCustomModalClass",
            ...NGBModalOptions,
        });
        modalRef.componentInstance.currentWin = "ARADJ_Accounts_Receivable_Adjustments.htm";
    };

    handleWindowScreen = (action) => {
        switch (action) {
            case 'Show Timestamp': {
                if (this.arAdjustmentsForm.get('arAdjustmentId').value) {
                    this.showTimestamp();
                } else {
                    this.messageService.findByMessageId(21127).subscribe(res => {
                        this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                    })
                }
            }
            break;
            case 'Processing Messages': {
                this.toastService.showToast('Action was not implemented', NgbToastType.Danger);
                break;
            }
            default:
                break;
        }
    }

    showTimestamp = () => {
        const ref = this.modalService.open(TimestampComponent, {
            size: <any>'xl',
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.title = "A/R Adjustments";

        ref.componentInstance.insertDateTime = this.arAdjustment.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.arAdjustment.insertProcess;
        ref.componentInstance.insertUser = this.arAdjustment.insertUser;
        ref.componentInstance.updateUser = this.arAdjustment.updateUser;
        ref.componentInstance.updateDateTime = this.arAdjustment.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.arAdjustment.updateProcess;
    }
}

