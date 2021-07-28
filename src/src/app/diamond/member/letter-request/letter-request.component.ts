/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {LetterTemplate} from '../../../api-models'
import {LetterTemplateService} from '../../../api-services/letter-template.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

// Use the Component directive to define the LetterRequestComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'letterrequest',
    templateUrl: './letter-request.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        LetterTemplateService
    ]
})
export class LetterRequestComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    letterRequestForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    editLetterTemplate: boolean;
    letterTemplate: LetterTemplate;
    letterTemplates: LetterTemplate[];
    dataGridGridOptions: GridOptions;
    dataGridgridApi: any;
    dataGridgridColumnApi: any;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
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

    createLetterTemplate() {
        this.formValidation.validateForm();
        if (this.letterRequestForm.valid) {
            let letterTemplate = new LetterTemplate();
            this.letterTemplateService.createLetterTemplate(letterTemplate).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editLetterTemplate = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateLetterTemplate(letterId: string) {
        this.formValidation.validateForm();
        if (this.letterRequestForm.valid) {
            let letterTemplate = new LetterTemplate();
            this.letterTemplateService.updateLetterTemplate(letterTemplate, letterId).subscribe(response => {
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editLetterTemplate = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveLetterTemplate() {
        if (this.editLetterTemplate) {
            this.updateLetterTemplate(this.letterTemplate.letterId)
        } else {
            this.createLetterTemplate();
        }
    }

    deleteLetterTemplate(letterId: string) {
        this.letterTemplateService.deleteLetterTemplate(letterId).subscribe(response => {
            this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getLetterTemplate(letterId: string) {
        this.letterTemplateService.getLetterTemplate(letterId).subscribe(letterTemplate => {
            this.letterTemplate = letterTemplate;
            this.letterRequestForm.patchValue({});
        });
    }

    getLetterTemplates() {
        this.letterTemplateService.getLetterTemplates().subscribe(letterTemplates => {
            this.letterTemplates = letterTemplates;
        });
    }

    dataGridGridOptionsExportCsv() {
        const params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'column1',
                field: 'description',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'column2',
                field: 'letterid',
                width: 150
            },
            {
                headerName: 'column3',
                field: 'insertdatetime',
                width: 150
            },
            {
                headerName: 'column4',
                field: 'addresseetype',
                width: 150
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        public activeModal: NgbActiveModal,
        private letterTemplateService: LetterTemplateService) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.letterRequestForm);
        this.createDataGrid();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        });
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.letterRequestForm = this.formBuilder.group({}, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
