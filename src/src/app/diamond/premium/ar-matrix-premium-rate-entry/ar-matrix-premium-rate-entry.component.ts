/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from "ag-grid-community";
import {NumberValidators} from '../../../shared/validators/number.validator';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PremiumMatrixHeader} from "../../../api-models/premium-matrix-header.model"
import {PremiumMatrixHeaderService} from "../../../api-services/premium-matrix-header.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DddwDtl, MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {PremiumMatrixHeadersLookup} from '../../../shared/lookup/premium-matrix-headers-lookup';
import {HttpClient} from '@angular/common/http';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {CONSTANTS, getArMatrixPremiumRateEntryComponent, SharedService} from '../../../shared/services/shared.service';
import {MatrixDetermYService} from '../../../api-services/premium/matrix-determ-y.service';
import {PremiumMatrixDetailService} from "../../../api-services/premium/premium-matrix-detail.service";
import {MatrixDetermHeaderService} from "../../../api-services/premium/matrix-determ-header.service";
import {MatrixDetermHeader} from "../../../api-models/premium/matrix-determ-header.model";
import {PremiumHelpComponent} from "../premium-help/premium-help.component";

// Use the Component directive to define the ArMatrixPremiumRateEntryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "ar-matrix-premium-rate-entry",
    templateUrl: "./ar-matrix-premium-rate-entry.component.html",
    styleUrls: ["./ar-matrix-premium-rate-entry.component.scss"],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        PremiumMatrixHeaderService,
    ],
})
export class ArMatrixPremiumRateEntryComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    arMatrixPremiumRateEntryForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public shortcuts: ShortcutInput[] = [];
    public secWin: SecWinViewModel;
    private windowId = "PREMM";
    public secColDetails = new Array<SecColDetail>();
    public isSuperUser = false;
    public secProgress = true;
    public inProgress = true;
    public editPremiumMatrixHeader: boolean;
    public premiumMatrixHeader: PremiumMatrixHeader;
    public premiumMatrixHeaders: PremiumMatrixHeader[];
    public copyPremiumMatrixHeaders: PremiumMatrixHeader[];
    public matrixDetermHeaders: MatrixDetermHeader[];
    public copyMatrixDetermHeaders: MatrixDetermHeader[];
    public userTemplateId: string;
    public matrixDef: string;
    public matrixDefStatus: boolean = false;
    public menu: Menu[] = [];
    public metrixDetermList: any[] = [];
    public amount: any[] = [];
    public searchStatus: boolean = false;
    @Input() showIcon: boolean = false;
    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;
    @ViewChild('matrixCalcMethodElf') matrixCalcMethodElf: ElementRef;
    public gridApi;
    public gridColumnApi;
    public matrixDeterminant;

    public columnDefs;
    public defaultColDef;
    public rowData: any;
    matrixCalcMethods: any[];
    matrixDeterminants: any[];
    openScreenStatus: boolean = false;
    isScreenCloseRequest: boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    public searchModel = new SearchModel(
        "premiummatrixheaders/lookup",
        PremiumMatrixHeadersLookup.PREMIUM_MATRIX_HEADERS_ALL,
        PremiumMatrixHeadersLookup.PREMIUM_MATRIX_HEADERS_BILLING,
        []
    );

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
        private premiumMatrixHeaderService: PremiumMatrixHeaderService,
        private premiumMatrixDetailService: PremiumMatrixDetailService,
        private matrixDetermHeaderService: MatrixDetermHeaderService,
        private matrixDetermYService: MatrixDetermYService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private sharedService: SharedService,
        private messageService: MessageMasterDtlService,
        private http: HttpClient,
        private renderer: Renderer2,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
        private el: ElementRef
    ) {
    }

    onLookupFieldChange(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupMatrixDefFieldSearchModel();
        } else if (event.key === "Tab") {
            event.preventDefault();
            let mDef = event.target.value;
            this.matrixDef = event.target.value;
            if (mDef === '') {
                this.messageService.findByMessageId(1049).subscribe(res => {
                    this.showPopUp('1049: ' + res[0].messageText, 'A/R Matrix Premium Rate Entry')
                })
            } else {
                this.getMatrixPremiumHeaderByMatrixDef(mDef.toUpperCase());
            }
        }
    }

    getMatrixPremiumHeaderByMatrixDef(mDef: string) {
        mDef = mDef.trim().length == 0 ? "-" : mDef;
        this.premiumMatrixHeaderService.getPremiumMatrixHeader(mDef).subscribe((resp) => {
            if (resp.matrixDef != null) {
                this.premiumMatrixHeader = new PremiumMatrixHeader();
                this.premiumMatrixHeader = resp;
                this.matrixDeterminant = mDef;
                this.oldMatrixDeterVal=this.premiumMatrixHeader.matrixDeterminant;
                this.matrixDefStatus = true;
                this.getMatrixPremiumHeaderGridDataByMatrixDef(mDef, resp.matrixDeterminant);
                this.setMatrixDefValues(this.premiumMatrixHeader);
                this.popUpMessage = null;
                this.searchStatus = true;
            } else {
                mDef = mDef == "-" ? resp.matrixDef + "" : mDef;
                this.matrixDef = mDef.toUpperCase();
                this.editPremiumMatrixHeader = false;
                this.arMatrixPremiumRateEntryForm.get("matrixDefinition").setValue(mDef);
                this.OpenNewPremiumMatrixHeaderPopUp();
            }
        });
    }
    control:any;
    getMatrixPremiumHeaderGridDataByMatrixDef(mDef: string, mDeterm: string) {
        let oldVal = this.oldMatrixDeterVal;
        this.oldMatrixDeterVal = mDeterm;
        mDef = mDef.trim().length == 0 ? '-' : mDef;
        this.matrixDetermYService.findByPremiumMatrixHeaderMatrixDetermAndMatrixdef(mDeterm, mDef).subscribe(async (response) => {
            if (response && response.length>0) {
                this.metrixDetermList = response;
                this.amount = response[response.length-1].premiumMatrixDetailViewModels;
                this.control = <FormArray>this.arMatrixPremiumRateEntryForm.controls.data;
                this.control.controls = [];
                if(mDeterm == oldVal){
                    if (this.metrixDetermList && this.metrixDetermList.length > 0) {
                        for (let i = 0; i < this.metrixDetermList.length; i++) {
                            let premiumMatrixDetailViewModels = this.metrixDetermList[i].premiumMatrixDetailViewModels;
                            let viewModalArray = this.formBuilder.array([]);
                            if (this.amount && this.amount.length > 0) {
                                for (let j = 0; j < this.amount.length; j++) {
                                    let rate = (premiumMatrixDetailViewModels[j]) ? premiumMatrixDetailViewModels[j].matrixRate : null;
                                    if (rate) {
                                        if ((rate + '').indexOf('.') >= 0) {
                                            rate = rate;
                                        } else {
                                            rate = (rate + '.0');
                                        }
                                    } else {
                                        rate = '.0';
                                    }
                                    viewModalArray.push(this.formBuilder.group({rate: [rate]}))
                                }
                            }
                            this.control.push(this.formBuilder.group({
                                name: [this.metrixDetermList[i].yaxisDescription],
                                // nested form array, you could also add a form group initially
                                rates: viewModalArray
                            }))
                        }
                    }
                } else {
                    this.checkMatrixDeterminant(this.metrixDetermList.length,mDeterm, oldVal)
                }
            } else {
                this.amount = [];
                this.control = <FormArray>this.arMatrixPremiumRateEntryForm.controls.data;
                this.control.controls = [];
                this.messageService.findByMessageId(1157)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "1157: " + message[0].messageText.replace('@1', mDeterm),
                            "A/R Matrix Premium Rate Entry "
                        );
                    });
            }
        });
    }

    checkMatrixDeterminant(rows: any, newValue: string, oldVal:string) {
        if(newValue != oldVal && rows>0){
            let popMsg = new PopUpMessage(
                'matrixPremiumRateEntry',
                'A/R Matrix Premium Rate Entry',
                '1044: Grid already exists. Press Yes to replace the existing grid.',
                'icon'
            );

            popMsg.buttons = [
                new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('no', 'No', 'btn btn-primary'),
                new PopUpMessageButton('cancel', 'Cancel', 'btn btn-primary'),
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {
                size: 'lg',
            });
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                if (event.name === 'yes') {
                    this.control.controls = [];
                    if (this.metrixDetermList && this.metrixDetermList.length > 0) {
                        for (let i = 0; i < this.metrixDetermList.length; i++) {
                            let premiumMatrixDetailViewModels = this.metrixDetermList[i].premiumMatrixDetailViewModels;
                            let viewModalArray = this.formBuilder.array([]);
                            if (premiumMatrixDetailViewModels && premiumMatrixDetailViewModels.length > 0) {
                                for (let j = 0; j < premiumMatrixDetailViewModels.length; j++) {
                                    let rate = premiumMatrixDetailViewModels[j].matrixRate;
                                    if (rate) {
                                        if ((rate + '').indexOf('.') >= 0) {
                                            rate = rate;
                                        } else {
                                            rate = (rate + '.0');
                                        }
                                    } else {
                                        rate = '.0';
                                    }
                                    viewModalArray.push(this.formBuilder.group({rate: [rate]}))
                                }
                            }
                            this.control.push(this.formBuilder.group({
                                name: [this.metrixDetermList[i].yaxisDescription],
                                // nested form array, you could also add a form group initially
                                rates: viewModalArray
                            }))
                        }
                    }
                } else if(event.name === 'no'){

                }
                this.popUpMessage = null;
            });
        }
    };

    OpenNewPremiumMatrixHeaderPopUp() {
        this.matrixDefStatus = false;
        this.messageService.findByMessageId(1169).subscribe(res => {
            let popMsg = new PopUpMessage(
                "memberNotExistPopup",
                "A/R Matrix Premium Rate Entry",
                '1169: ' +res[0].messageText.replace('@1', this.matrixDef),
                "icon"
            );
            popMsg.buttons = [
                new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
                new PopUpMessageButton("no", "No", "btn btn-primary"),
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {
                size: "lg",
            });
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                this.popUpButtonClicked(event);
            });
            this.searchStatus = false;
        });
    }

    popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == "yes") {
            this.editPremiumMatrixHeader = false;
            let control = <FormArray>this.arMatrixPremiumRateEntryForm.controls.data;
            control.controls = [];
            this.matrixDefStatus = true;
            let premiumMatrixHeader = new PremiumMatrixHeader();
            premiumMatrixHeader.matrixDef = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixDefinition"
            );
            this.arMatrixPremiumRateEntryForm.patchValue({
                matrixCalcMethod: 'D'
            });
            this.arMatrixPremiumRateEntryForm.get('matrixDefinition').disable();
            setTimeout(() => {
                this.renderer.selectRootElement('#matrixDescription').focus()
            }, 1000)
        } else {
            this.matrixDef = "";
            this.arMatrixPremiumRateEntryForm.get("matrixDefinition").setValue("");
        }
    }

    openLookupMatrixDefFieldSearchModel() {
        let premiumMatrixHeader = new PremiumMatrixHeader();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                this.matrixDefStatus = true;
                premiumMatrixHeader = resp;
                this.matrixDef = resp.matrixDef;
                this.getMatrixPremiumHeaderByMatrixDef(this.matrixDef.toUpperCase());
            }
        });
    }

    setMatrixDefValues(premiumMatrixHeader: PremiumMatrixHeader) {
        let calcMethod;
        this.matrixCalcMethods.map(item => {
            if (item.value === premiumMatrixHeader.matrixCalcMethod) {
                return calcMethod = item.key
            }
        })
        this.arMatrixPremiumRateEntryForm.patchValue({
            matrixDefinition: premiumMatrixHeader.matrixDef,
            matrixDescription: premiumMatrixHeader.matrixDescription,
            matrixCalcMethod: calcMethod,
            matrixDeterminant: premiumMatrixHeader.matrixDeterminant,
        }, {emitEvent: false});
        this.searchStatus = true;
        this.arMatrixPremiumRateEntryForm.get('matrixDefinition').disable();
        setTimeout(() => {
            this.formValueChangeStatus();
        }, 2000)
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
        ref.componentInstance.showIcon = true;
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

    
    formValueChanged:boolean=false;
    onCrossClicked(){
        this.isScreenCloseRequest = true;
        if(this.formValueChanged){
            this.formChangePopUp()
        } else {
            this.activeModal.dismiss('Cross click')
        }
    }

    formChangePopUp(){
        let popMsg = new PopUpMessage(
            'matrixPremiumRateEntry',
            'A/R Matrix Premium Rate Entry',
            '29065: Data has been modified. Press Yes to save the changes.',
            'icon'
        );

        popMsg.buttons = [
            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
            new PopUpMessageButton('no', 'No', 'btn btn-primary'),
            new PopUpMessageButton('cancel', 'Cancel', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, {
            size: 'lg',
        });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            this.openPopUpButtonClicked(event);
        });
    }

    openPopUpButtonClicked(button:any) {
        if (button.name === 'yes') {
            this.formValueChanged = false;
            if (this.editPremiumMatrixHeader) {
                this.updatePremiumMatrixHeader(this.arMatrixPremiumRateEntryForm.get('matrixDefinition').value);
            } else {
                this.createPremiumMatrixHeader();
            }
        }
        if (button.name === 'no') {
            this.formValueChanged = false;
            this.arMatrixPremiumRateEntryForm.reset();
            this.matrixDefStatus = false;
            this.activeModal.dismiss('Cross click')
        }
        this.popUpMessage = null;
    }

    matrixDeterminantPopUp(){
        let popMsg = new PopUpMessage(
            'matrixPremiumRateEntry',
            'A/R Matrix Premium Rate Entry',
            '1044: Grid already exists. Press Yes to replace the existing grid.',
            'icon'
        );

        popMsg.buttons = [
            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
            new PopUpMessageButton('no', 'No', 'btn btn-primary'),
            new PopUpMessageButton('cancel', 'Cancel', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, {
            size: 'lg',
        });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            this.openMatrixDetermButtonClicked(event);
        });
    }
    openMatrixDetermButtonClicked(button:any) {
        if (button.name === 'yes') {
            console.log('yes');
        }
        if (button.name === 'no') {

        }
        this.popUpMessage = null;
    }


    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arMatrixPremiumRateEntryForm);
    }

    createPremiumMatrixHeader() {
        this.formValidation.validateForm();
        if (this.arMatrixPremiumRateEntryForm.valid) {
            let premiumMatrixHeader = new PremiumMatrixHeader();
            premiumMatrixHeader.matrixDescription = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixDescription"
            );
            premiumMatrixHeader.matrixDeterminant = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixDeterminant"
            );
            premiumMatrixHeader.matrixCalcMethod = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixCalcMethod"
            );
            premiumMatrixHeader.matrixDef = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixDefinition"
            );
            this.premiumMatrixHeaderService
                .createPremiumMatrixHeader(premiumMatrixHeader)
                .subscribe((response) => {
                    this.premiumMatrixDetailService.updatePremiumMatrixHeaderDetail(premiumMatrixHeader.matrixDef, this.arMatrixPremiumRateEntryForm.get('data').value)
                        .subscribe((detailResponse) => {
                            this.toastService.showToast(
                                "Record successfully created",
                                NgbToastType.Success
                            );
                            this.searchStatus = true;
                            this.editPremiumMatrixHeader = true;
                            this.formValueChanged = false;
                            if (this.openScreenStatus === true) {
                                this.openScreen()
                            }
                            if (this.isScreenCloseRequest) {
                                this.activeModal.close()
                            }
                        });
                });
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    updatePremiumMatrixHeader(matrixDef: string) {
        this.formValidation.validateForm();
        if (this.arMatrixPremiumRateEntryForm.valid) {
            let calcMethod;
            this.matrixCalcMethods.map(item => {
                if (item.key ===  Form.getValue(this.arMatrixPremiumRateEntryForm, "matrixCalcMethod")) {
                    return calcMethod = item.value
                }
            })
            let premiumMatrixHeader = new PremiumMatrixHeader();
            premiumMatrixHeader.matrixDescription = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixDescription"
            );
            premiumMatrixHeader.matrixDeterminant = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixDeterminant"
            );
            premiumMatrixHeader.matrixCalcMethod = calcMethod;
            premiumMatrixHeader.matrixDef = Form.getValue(
                this.arMatrixPremiumRateEntryForm,
                "matrixDefinition"
            );
            this.premiumMatrixHeaderService
                .updatePremiumMatrixHeader(premiumMatrixHeader, matrixDef)
                .subscribe((response) => {
                    this.premiumMatrixDetailService.updatePremiumMatrixHeaderDetail(matrixDef, this.arMatrixPremiumRateEntryForm.get('data').value)
                        .subscribe((detailResponse) => {
                            this.toastService.showToast(
                                "Record successfully updated",
                                NgbToastType.Success
                            );
                            this.editPremiumMatrixHeader = true;
                            this.formValueChanged = false;
                            if (this.openScreenStatus === true) {
                                this.openScreen()
                            }
                            if (this.isScreenCloseRequest) {
                                this.activeModal.close()
                            }
                        });
                });
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    savePremiumMatrixHeader() {
        if (this.editPremiumMatrixHeader) {
            this.updatePremiumMatrixHeader(this.arMatrixPremiumRateEntryForm.get('matrixDefinition').value);
        } else {
            this.createPremiumMatrixHeader();
        }
    }

    deletePremiumMatrixHeader(matrixDef: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp("Not permitted to delete", "Group Master Security");
        } else {
            this.premiumMatrixHeaderService
                .deletePremiumMatrixHeader(matrixDef)
                .subscribe((response) => {
                    this.toastService.showToast(
                        "Record successfully deleted",
                        NgbToastType.Success
                    );
                });
        }
    }

    getPremiumMatrixHeader(matrixDef: string) {
        this.premiumMatrixHeaderService
            .getPremiumMatrixHeader(matrixDef)
            .subscribe((premiumMatrixHeader) => {
                this.premiumMatrixHeader = premiumMatrixHeader;
                this.arMatrixPremiumRateEntryForm.patchValue({
                    matrixDefinition: this.premiumMatrixHeader.matrixDescription,
                    matrixDescription: this.premiumMatrixHeader.matrixDeterminant,
                    matrixCalcMethod: this.premiumMatrixHeader.matrixCalcMethod,
                    matrixDeterminant: this.premiumMatrixHeader.matrixDef,
                });
            });
    }

    getMatrixDetermHeaders() {
        this.matrixDetermHeaderService.getMatrixDetermHeaders()
            .subscribe((matrixDetermHeaders: MatrixDetermHeader[]) => {
                this.matrixDetermHeaders = matrixDetermHeaders;
                this.copyMatrixDetermHeaders = matrixDetermHeaders;
            })
    }

    getPremiumMatrixHeaders() {
        this.premiumMatrixHeaderService
            .getPremiumMatrixHeaders()
            .subscribe((premiumMatrixHeaders) => {
                this.premiumMatrixHeaders = premiumMatrixHeaders;
                this.copyPremiumMatrixHeaders = premiumMatrixHeaders;
            });
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
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId("BENEF_PROCESS_ORDER_MASTER", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
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
        this.secWinService
            .getSecWin(this.windowId, secUserId)
            .subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        "You are not Permitted to view A/R Premium Rate Entry",
                        "Benefit Processing Order Permission"
                    );
                }
            });
    }

    private initializePermission(): void {
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
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arMatrixPremiumRateEntryForm);
        this.getMatrixCalcMethod();
        this.getPremiumMatrixHeaders();
        this.getMatrixDetermHeaders();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.arMatrixPremiumRateEntryForm = this.formBuilder.group(
            {
                matrixDefinition: ["", {updateOn: "blur", validators: []}],
                matrixDescription: ["", {updateOn: "blur", validators: []}],
                matrixCalcMethod: ["", {updateOn: 'blur', validators: []}],
                matrixDeterminant: ["", {updateOn: "blur", validators: []}],
                f65: ["", {updateOn: "blur", validators: []}],
                f69: ["", {updateOn: "blur", validators: []}],
                f70: ["", {updateOn: "blur", validators: []}],
                data: this.formBuilder.array([])
            },
            {updateOn: "submit"}
        );
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            case "Lookup": {
                this.openLookupMatrixDefFieldSearchModel();
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

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {
                        name: 'New',
                        shortcutKey: 'Ctrl+M',
                        disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
                    },
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {
                        name: 'Save',
                        shortcutKey: 'Ctrl+S',
                        disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
                    },
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    {name: 'Next', shortcutKey: 'F8', disabled: true},
                    {name: 'Previous', shortcutKey: 'F7', disabled: true},
                ]
            },
            {
                menuItem: "Special",
                dropdownItems: [{name: "Copy", shortcutKey: 'Alt+C', disabled: true}],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S', disabled: true},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Claims Interest Calc. Rules'},
                    {name: '3 Field Level Security Setup'},
                    {name: '4 Bill Types-Institutional Claims'},
                    {name: '5 Process EDI'},
                    {name: '6 Window Description'},
                    {name: '7 A/R Matrix Determinants'},
                ]
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            },
        ];
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewScreen();
                    break;
                }
                case "Open": {
                    this.createNewScreen();
                    break;
                }
                case "Save": {
                    this.savePremiumMatrixHeader();
                    break;
                }
                case "Close": {
                    this.onCrossClicked();
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast(
                        "Action is not valid",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === "Special") {
            // handle special-Menu Actions
            switch (event.action) {
                case "Copy": {
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Help') {
            this.helpScreen();
        }
    }

    createNewScreen = () => {
        this.openScreenStatus = true;
        if (this.formValueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'A/R Matrix Premium Rate Entry', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.savePremiumMatrixHeader();
                        }
                        else if (resp.name === 'No') {
                            this.openScreen();
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.openScreen();
        }
    };

    formValueChangeStatus = () => {
        this.arMatrixPremiumRateEntryForm.valueChanges.subscribe(() => {
            this.editPremiumMatrixHeader = true;
        })
    };

    getMatrixCalcMethod = () => {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('matrix_calc_method', 'dw_premm_header_de', 0).subscribe((res: any) => {
            this.matrixCalcMethods = res;
        });
    };

    oldMatrixDeterVal:string;
    setFieldValue(fieldName: string, fieldValue: any, fieldKey: string) {
        console.log(fieldName, fieldValue, fieldKey)
        this.formValueChanged=true;
        this.arMatrixPremiumRateEntryForm.controls[fieldName].patchValue(
            fieldValue
        );
        if (fieldName === 'matrixDeterminant') {
            this.getMatrixPremiumHeaderGridDataByMatrixDef(fieldKey, fieldValue)
        }
    }

    matrixDescriptionKeyInput = (event:any) => {
        this.formValueChanged=true;
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(27013).subscribe(res => {
                    this.showPopUp('27013: ' + res[0].messageText.replace('@1', 'matrix_description'), 'A/R Matrix Premium Entry')
                })
            } else {
                this.matrixCalcMethodElf.nativeElement.focus();
            }
        }
    };

    ngAfterViewInit(): void {
        this.shortcuts.push(...getArMatrixPremiumRateEntryComponent(this));
        this.cdr.detectChanges();
    }

    onKeyUpMatrixDeterminant(event) {
        this.formValueChanged=true;
        if (event.target.value) {
            let list = [];
            if (this.copyMatrixDetermHeaders && this.copyMatrixDetermHeaders.length > 0) {
                for (let i = 0; i < this.copyMatrixDetermHeaders.length; i++) {
                    if (this.copyMatrixDetermHeaders[i].matrixDeterminant.startsWith(event.target.value)) {
                        list.push(this.copyMatrixDetermHeaders[i]);
                    }
                }
            }
            this.matrixDetermHeaders = list;
        } else {
            this.matrixDetermHeaders = this.copyMatrixDetermHeaders;
        }
    }

    getRateValue(i ,j) {
        let rate = this.arMatrixPremiumRateEntryForm.get('data')['controls'][i].get('rates')['controls'][j].get('rate').value;
        if (rate) {
            if ((rate + '').indexOf('.') >= 0) {
                return rate;
            } else {
                return (rate + '.0');
            }
        } else {
            return '.0';
        }
    }

    getYaxisName(i) {
        return this.arMatrixPremiumRateEntryForm.get('data')['controls'][i].get('name').value;
    }

    onChangeRate(event, i, j) {
        if (event.key === 'ArrowUp' && i > 0) {
            let id =  (i-1) + 'a' + j + 'rate';
            this.el.nativeElement.querySelector("[id='"+id+"']").focus();
        } else if (event.key === 'ArrowDown' && i < this.metrixDetermList.length-1) {
            let id =  (i+1) + 'a' + j + 'rate';
            this.el.nativeElement.querySelector("[id='"+id+"']").focus();
        } else {
            this.arMatrixPremiumRateEntryForm.get('data')['controls'][i].get('rates')['controls'][j].get('rate').setValue(event.target.value);
        }
    };

    helpScreen() {
        const modalRef = this.modalService.open(PremiumHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.currentWin = "PREMM_Matrix_Premium_Rate_Entry.htm";
        modalRef.componentInstance.showIcon = true;
    };

    premiumCalcMethodEvent(event) {
        if (this.premiumMatrixHeader) {
            event.preventDefault();
        }
    }

    premiumDeterminantEvent(event) {
        if (this.premiumMatrixHeader) {
            event.preventDefault();
        }
    }

    openScreen() {
        this.arMatrixPremiumRateEntryForm.reset();
        this.arMatrixPremiumRateEntryForm.get('matrixDefinition').enable();
        this.matrixDefStatus = false;
        this.premiumMatrixHeader = null;
        this.editPremiumMatrixHeader = false;
        this.arMatrixPremiumRateEntryForm.patchValue({
            matrixCalcMethod: 'D - Amount'
        });
        let control = <FormArray>this.arMatrixPremiumRateEntryForm.controls.data;
        control.controls = [];
        this.amount = [];
        const element = this.renderer.selectRootElement('#matrixDefinition');
        element.focus();
        this.openScreenStatus = false;
    }
}
