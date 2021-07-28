/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GridOptions} from "ag-grid-community";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage} from "../../../shared/components/alert-message";
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {DatePickerConfig} from "../../../shared/config";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


// Use the Component directive to define the IdCardPrintSelectionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'idcardprintselection',
    templateUrl: './id-card-print-selection.component.html',
})
export class IdCardPrintSelectionComponent implements OnInit {

    @Input() selectionType: string;


    idCardPrintSelectionForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    @Input() showIcon: boolean = false;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.idCardPrintSelectionForm);
        this.createDataGrid();
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
                headerName: "Selection",
                field: "",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "From Value",
                field: "",
                width: 200
            },
            {
                headerName: "Default",
                field: "",
                width: 200
            }
        ];
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.idCardPrintSelectionForm = this.formBuilder.group({
            columnNameLbselectiont: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
