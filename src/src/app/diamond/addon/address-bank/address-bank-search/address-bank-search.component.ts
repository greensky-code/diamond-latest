/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from 'ag-grid-community';
import {NumberValidators} from '../../../../shared/validators/number.validator';
import {CustomValidators} from '../../../../shared/validators/custom-validator';
import {Mask} from '../../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../../shared/config';
import {Form} from '../../../../shared/helpers/form.helper';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../../shared/components/alert-message'
import {SecWinService} from '../../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../../shared/services/security.service';
import {CountryService} from "../../../../api-services/country.service";
import {CiebCountryCode, Country} from "../../../../api-models";
import {CiebCountryCodeService} from "../../../../api-services/addon";

// Use the Component directive to define the AddressBankSearchComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'addressbanksearch',
    templateUrl: './address-bank-search.component.html',
    styleUrls: ['./address-bank-search.component.scss'],


})
export class AddressBankSearchComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    addressBankSearchForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = "";
    public isSuperUser = false;
    public secProgress = true;
    showSelectBranch=false;

    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;
    SelectBranch = new EventEmitter<any>();
    countryDropdownValues: CiebCountryCode[] = [];
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

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    countries: Country[];

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
        };
        this.dataGridGridOptions.editType = "fullRow";
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Bank Name",
                field: "bankName",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Routing Number",
                field: "routingNum",
                width: 200,
            },
            {
                headerName: "Accuity ABA/Verified",
                field: "accuity",
                width: 200,
            },
            {
                headerName: "Address",
                field: "address",
                width: 200,
            },
        ];
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
        private router: Router,
        public activeModal: NgbActiveModal,
        private ciebCountryCodeService: CiebCountryCodeService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.addressBankSearchForm);
        this.createDataGrid();
        this.getCountries();
        setTimeout(() => {
            this.addressBankSearchForm.patchValue({
                pEntityCode: '1'
            });
            this.dataGridGridOptions.api.setRowData([]);
        }, 1000)
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.addressBankSearchForm);
        this.createDataGrid();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.addressBankSearchForm = this.formBuilder.group(
            {
                pEntityCode: ["", {updateOn: "blur", validators: []}],
                pBankName: ["", {updateOn: "blur", validators: []}],
                pRoutingNum: ["", {updateOn: "blur", validators: []}],
                pCity: ["", {updateOn: "blur", validators: []}],
                pState: ["", {updateOn: "blur", validators: []}],
                pPostalCode: ["", {updateOn: "blur", validators: []}],
                pCountryCode: ["", {updateOn: "blur", validators: []}],
                pPaymentType: ["", {updateOn: "blur", validators: []}],
            },
            {updateOn: "submit"}
        );
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    startSearch() {
        var data = [{
            bankName: "BANCO DE CHILE",
            routingNum: "BANCODECHILE",
            accuity: "Manual",
            address: "Ahumada 251 Santiago, 8320000 Chile",
        }];
        this.dataGridGridOptions.api.setRowData(data);
        this.dataGridGridOptions.api.selectIndex(0, false, false)
        this.showSelectBranch=true;
    }

    closeModal = () => {
        this.activeModal.close();
    };

    resetAllForm = () => {
        this.addressBankSearchForm.reset();
        this.addressBankSearchForm.patchValue({
            pEntityCode: '1'
        })
    };

    getCountries = () => {
        this.ciebCountryCodeService.getCiebCountryCodes().subscribe(res => {
            this.countryDropdownValues = res
        })
    };

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.addressBankSearchForm.controls[fieldName].patchValue(fieldValue);
    }
      SelectBranchSubmit() {
    setTimeout(() => {
      this.SelectBranch.emit();
      this.activeModal.close();
    }, 2000);
  }
}
