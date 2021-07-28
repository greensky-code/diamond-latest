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

import {MemberMaster, SecUser} from '../../../api-models'
import {MemberMasterService} from '../../../api-services/member-master.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecUserService} from "../../../api-services";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

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

    selector: 'changesubscriberdesignation',
    templateUrl: './change-subscriber-designation.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService
    ]

})
export class ChangeSubscriberDesignationComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    changeSubscriberDesignationForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    private displayMessage: any;
    popUpMessage: PopUpMessage;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    private rowData: any;
    editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @Input() memberData: any;

    secWin: SecWinViewModel;
    windowId = 'MEMBR';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private memberMasterService: MemberMasterService,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState () {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.changeSubscriberDesignationForm);
        this.createDataGrid();
        if(this.memberData!=undefined){
        this.getMemberMasterBySubscriberId(this.memberData.subscriberId);
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
            this.userTemplateId = user.dfltTemplate
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
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Change Subscriber Designation',
                        'Change Subscriber Designation Permission'
                    );
                }
            }
        );
    }

    /**
     * Get Security Column Details
     */
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

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
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

    createMemberMaster() {
        if (this.securityService.checkInsertUpdatePermissions(false, this.secWin)) {

            this.formValidation.validateForm();
            if (this.changeSubscriberDesignationForm.valid) {
                let memberMaster = new MemberMaster();
                this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editMemberMaster = false;
                });

            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        }
    }

    updateMemberMaster(seqMembId: number, member: any) {
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {

            this.memberMasterService.updateMemberMaster(member, seqMembId).subscribe(response => {
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editMemberMaster = false;
            });
        }
    }

    deleteMemberMaster(seqMembId: number) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
            this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getMemberMaster(seqMembId: number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.changeSubscriberDesignationForm.patchValue({});
        });
    }

    onRowSelected(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.rowData = event.data;
    }

    onClickOk() {
        for (let member of this.memberMasters) {
            member.seqSubsId = this.rowData.seqMembId;
            this.updateMemberMaster(member.seqMembId, member);
            this.activeModal.close();
            this.memberData.memberMasterForm.reset();
        }
    }

    onClickCancel() {
        this.modalService.dismissAll();
    }
    getMemberMasterBySubscriberId(subscriberId: string) {
        this.memberMasterService.findByDiamondAndSubscriberId(null, subscriberId).subscribe(memberMasters => {
            if (memberMasters) {
                this.memberMasters = memberMasters;
                this.dataGridGridOptions.api.setRowData(memberMasters);
            }
        });
    }

    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(memberMasters => {
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
                headerName: 'Subscriber ID',
                field: 'subscriberId',
                width: 200,
            },
            {
                headerName: 'PN',
                field: 'personNumber',
                width: 200
            },
            {
                headerName: 'Last Name',
                field: 'lastName',
                width: 200
            },
            {
                headerName: 'First Name',
                field: 'firstName',
                width: 200
            },
            {
                headerName: 'DOB',
                field: 'dateOfBirth',
                width: 200
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
