/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions, ICellRendererParams} from 'ag-grid-community';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {CustomValidators} from '../../../../shared/validators/custom-validator';
import {Mask} from '../../../../shared/pipes/text-format.pipe';
import {DateFormatPipe} from '../../../../shared/pipes/date-format.pipe';
import {FormValidation} from '../../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {SearchboxComponent} from '../../../../shared/components/searchbox/searchbox.component';
import {SearchModel} from '../../../../shared/models/models';
import {MemberMasterReasconLookup} from '../../../../shared/lookup/member-master-reason-lookup';
import {LineOFBLookup} from '../../../../shared/lookup/line-of-business-lookup';
import {InrulIpaLookup} from '../../../../shared/lookup/inrul-ipa-lookup';
import {InrulPanelLookup} from '../../../../shared/lookup/inrul-panel-lookup';
import {SearchService} from '../../../../shared/services/search.service';

// Use the Component directive to define the IncentiveRuleCopyComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'incentive-rule-copy',
    templateUrl: './incentive-rule-copy.component.html',
    styleUrls: ['./incentive-rule-copy.component.scss'],
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe
    ]

})
export class IncentiveRuleCopyComponent implements OnInit {
    @Input() memberData: any;
    @Output() confirmation = new EventEmitter<any>();
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private params: ICellRendererParams;
    incentiveProgramRuleCopyForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;

    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    LobSearchModal = new SearchModel(
        'linesofbusinessmaster/LOB/lookup',
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        []
    );

    ipaModal = new SearchModel(
        'ipamasters/lookup',
        InrulIpaLookup.ALL,
        InrulIpaLookup.DEFAULT,
        []
    );

    panelModal = new SearchModel(
        'panelmasters/lookup',
        InrulPanelLookup.ALL,
        InrulPanelLookup.DEFAULT,
        []
    );

    reasonModel = new SearchModel(
        'membermasters/reason/lookup',
        MemberMasterReasconLookup.REASON_ALL,
        MemberMasterReasconLookup.REASON_DEFAULT,
        [{ 'REASON_CODE_TYPE': 'TM' }]
    );

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private router: Router,
        private searchService: SearchService,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.incentiveProgramRuleCopyForm);
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

    backToScreen() {
        this.activeModal.close();
    }

    openReasonLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.reasonModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res && res.REASON_CODE) {
                this.incentiveProgramRuleCopyForm.get('termReason').setValue(res.REASON_CODE);
            }
        });
    }

    onReasonLookupFieldChange(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openReasonLookupFieldSearchModel();
        }
    }

     onClickOk() {
         if (this.incentiveProgramRuleCopyForm.valid) {
             const emittedValue = {
                 idCopy: this.incentiveProgramRuleCopyForm.get('id').value,
                 lineOfBusCopy: this.incentiveProgramRuleCopyForm.get('lineOfBus').value,
                 ipaCopy: this.incentiveProgramRuleCopyForm.get('ipa').value,
                 panelCopy: this.incentiveProgramRuleCopyForm.get('panel').value,
                 effectiveDateCopy: this.incentiveProgramRuleCopyForm.get('effectiveDate').value,
                 termDateCopy: this.incentiveProgramRuleCopyForm.get('termDate').value,
                 termReasonCopy: this.incentiveProgramRuleCopyForm.get('termReason').value,
             }
             this.confirmation.emit(emittedValue);
             this.activeModal.close();
         } else {
             this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
         }
     }

    lookupLOB(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.LobSearchModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.incentiveProgramRuleCopyForm.get('lineOfBus').setValue(res.lineOfBusiness);
                }
            });
        } else if (event.key === 'Tab') {
            let res = [{'lineOfBusiness': event.target.value}];
            let sm = JSON.parse(JSON.stringify(this.LobSearchModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.incentiveProgramRuleCopyForm.get('lineOfBus').setValue(null);
                }
            });
        }
    }

    lookupIPA(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.ipaModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.incentiveProgramRuleCopyForm.get('ipa').setValue(res.ipaId);
                }
            });
        } else if (event.key === 'Tab') {
            let res = [{'ipaId': event.target.value}];
            let sm = JSON.parse(JSON.stringify(this.ipaModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.incentiveProgramRuleCopyForm.get('ipa').setValue(null);
                }
            });
        }
    }

    lookupPanel(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.panelModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.incentiveProgramRuleCopyForm.get('panel').setValue(res.panelId);
                }
            });
        } else if (event.key === 'Tab') {
            let res = [{'panelId': event.target.value}];
            let sm = JSON.parse(JSON.stringify(this.panelModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.incentiveProgramRuleCopyForm.get('panel').setValue(null);
                }
            });
        }
    }


    // Use constructor injection to inject an instance of a FormBuilder

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.incentiveProgramRuleCopyForm = this.formBuilder.group({
            id: ['', {updateOn: 'blur', validators: [Validators.required]}],
            description: ['', {updateOn: 'blur', validators: []}],
            lineOfBus: ['', {updateOn: 'blur', validators: [Validators.required]}],
            ipa: ['', {updateOn: 'blur', validators: []}],
            panel: ['', {updateOn: 'blur', validators: []}],
            effectiveDate: ['', {updateOn: 'blur', validators: [Validators.required]}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            termReason: ['', {updateOn: 'blur', validators: []}],
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
}
