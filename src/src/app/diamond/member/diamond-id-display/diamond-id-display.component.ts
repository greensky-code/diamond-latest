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

import {MemberMaster} from '../../../api-models'
import {MemberMasterService} from '../../../api-services/member-master.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


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

    selector: 'diamondiddisplaycomponent',
    templateUrl: './diamond-id-display.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService
    ]

})
export class DiamondIdDisplayComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    alertMessage: AlertMessage;
    private displayMessage: any;
    popUpMessage: PopUpMessage;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private rowData: any;
    private memberMasters: MemberMaster[];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @Input() memberData: any;
    modalReference: NgbModalRef;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private memberMasterService: MemberMasterService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.displayMessage = {};
        this.createDataGrid();
        this.getMemberMaster();
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
    }

    closeModal() {
        this.activeModal.close();
    }

    getMemberMaster() {
        this.memberMasterService.findByDiamondAndSubscriberId(null, null).subscribe(memberMasters => {
            if (memberMasters) {
                let members = [];
                for (let member of memberMasters) {
                    if (member.diamondId) {
                        members.push(member)
                    }
                }
                this.dataGridGridOptions.api.setRowData(members);
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
                headerName: 'Subscriber Id',
                field: 'subscriberId',
                width: 200,
            },
            {
                headerName: 'Person No',
                field: 'personNumber',
                width: 200
            },
            {
                headerName: 'First',
                field: 'firstName',
                width: 200
            },
            {
                headerName: 'Last',
                field: 'lastName',
                width: 200
            },
            {
                headerName: 'Diamond Id',
                field: 'diamondId',
                width: 200,
            }
        ];
    }
}
