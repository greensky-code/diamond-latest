/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions, ICellRendererParams} from 'ag-grid-community';
import {NumberValidators} from '../../../shared/validators/number.validator';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {MemberMasterService} from '../../../api-services/member-master.service';
import {MemberMaster} from '../../../api-models/member-master.model';
import {SearchModel} from '../../../shared/models/models';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DiamondIdDisplayComponent} from '../diamond-id-display/diamond-id-display.component';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

// Use the Component directive to define the AddDiamondIdComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'app-add-diamond-id',
    templateUrl: './add-diamond-id.component.html',
    styleUrls: ['./add-diamond-id.component.scss'],
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService
    ]

})
export class AddDiamondIdComponent implements OnInit {
    @Input() memberData: any;
    @Output() diamondId = new EventEmitter<any>();
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private params: ICellRendererParams;
    addDiamondIdForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private memberMasterService: MemberMasterService,
        private router: Router,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.addDiamondIdForm);
    }

    agInit(params: ICellRendererParams) {
        this.params = params;
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

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createMemberMaster() {
        this.formValidation.validateForm();
        if (this.addDiamondIdForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.diamondId = this.addDiamondIdForm.get('diamondId').value;
            this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editMemberMaster = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }


    updateDiamondId(seqMembId: number) {
        this.formValidation.validateForm();
        if (this.addDiamondIdForm.valid) {
            let memberMaster = this.memberData.member;
            memberMaster.diamondId = this.addDiamondIdForm.get('diamondId').value;
            this.memberMasterService.updateMemberMaster(memberMaster, seqMembId).subscribe(response => {
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editMemberMaster = false;
                this.diamondId.emit(this.addDiamondIdForm.get('diamondId').value);
                this.activeModal.close();
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    public saveDiamondId() {
        this.updateDiamondId(this.memberData.memberId)
    }

    backToScreen() {
       // this.router.navigate(['/page-list']);
        this.activeModal.close();
    }

    deleteMemberMaster(seqMembId: number) {
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
            this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getMemberMaster(seqMembId: number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.addDiamondIdForm.patchValue({
                'diamondId': this.memberMaster.diamondId,
            });
        });
    }

    public viewDiamondId() {
        const ref = this.modalService.open(DiamondIdDisplayComponent, {size:<any>'S'});
        ref.componentInstance.showIcon = true;
    }

    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(memberMasters => {
            this.memberMasters = memberMasters;
        });
    }

    // Use constructor injection to inject an instance of a FormBuilder

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.addDiamondIdForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: [Validators.maxLength(12)]}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
}
