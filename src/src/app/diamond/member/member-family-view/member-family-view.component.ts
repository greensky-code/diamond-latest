/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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

import {MemberMaster} from '../../../api-models'
import {MemberMasterService} from '../../../api-services/member-master.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


// Use the Component directive to define the ChangeSubscriberDesignationComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'memberfamilyviewcomponent',
    templateUrl: './member-family-view.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService
    ]

})
export class MemberFamilyViewComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    changeSubscriberDesignationForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    private displayMessage: any;
    popUpMessage: PopUpMessage;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private rowData: any;
    private memberMasters: MemberMaster[];
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @Input() memberData: any;
    @Input() showIcon: boolean = false;
    @Input() personNum: string;
    @Output() memberDetails = new EventEmitter<any>();
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private memberMasterService: MemberMasterService,
        private activeModal: NgbActiveModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.changeSubscriberDesignationForm);
        this.createDataGrid();
        this.getMemberMasterBySubscriberId(this.memberData.subscriberId);
    }

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

    popUpButtonHandler(button: any) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    onRowSelected(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.rowData = event.data;
        this.memberDetails.emit(event.data);
        this.activeModal.close();
    }

    getMemberMasterBySubscriberId(subscriberId: string) {
        this.memberMasterService.findBySubscriberId(subscriberId).subscribe(memberMasters => {
            if (memberMasters) {
                this.memberMasters = memberMasters;
                this.dataGridGridOptions.api.setRowData(memberMasters);
            }
        });
    }

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        // this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                width: 70,
            },
            {
                headerName: 'Person No',
                field: 'personNumber',
                width: 150
            },
            {
                headerName: 'Last',
                field: 'lastName',
                width: 150
            },
            {
                headerName: 'First',
                field: 'firstName',
                width: 150
            },
            {
                headerName: 'DOB',
                field: 'dateOfBirth',
                width: 150
            },
            {
                headerName: 'Gender',
                field: 'gender',
                width: 100,
            },
            {
                headerName: 'Employee Number',
                field: 'employeeNo',
                width: 200,
            },
            {
                headerName: 'Citizenship',
                field: 'userDefined2',
                width: 150,
            }
        ];
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.changeSubscriberDesignationForm = this.formBuilder.group({
            selectTheMemberYouWishTo: ['', {updateOn: 'blur', validators: []}],
            clickCancelToReturnWithout: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
