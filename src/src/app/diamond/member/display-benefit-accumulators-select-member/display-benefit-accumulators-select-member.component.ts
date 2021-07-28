/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {DatePipe} from '@angular/common';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, datePickerModel} from "../../../shared/config";
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {MemberMaster} from '../../../api-models';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {SearchModel} from "../../../shared/models/models";
import {MemberMasterLookup} from "../../../shared/lookup/member-master-lookup";
import {GroupMasterLookup} from "../../../shared/lookup/group-master-lookup";
import {NgbToastType} from 'ngb-toast';
import {Form} from '../../../shared/helpers/form.helper';
import {MemberEligHistoryService} from '../../../api-services/member-elig-history.service';
import {getdisplayBenefitAccumSelectShortcutKeys} from '../../../shared/services/shared.service';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {MessageMasterDtlService} from "../../../api-services";
import * as moment from 'moment';

// Use the Component directive to define the DisplayBenefitAccumulatorsSelectMemberComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'displaybenefitaccumulatorsselectmember',
    templateUrl: './display-benefit-accumulators-select-member.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService,
        MemberEligHistoryService
    ]

})
export class DisplayBenefitAccumulatorsSelectMemberComponent implements OnInit {

    @Output() onRowSelected = new EventEmitter<any>();

    selectMemberForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public popUpMessage: PopUpMessage;
    memberMasters: MemberMaster[] = [];
    memberMaster: MemberMaster;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = datePickerModel;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon: boolean = false;
    // tslint:disable-next-line:max-line-length
    searchModel = new SearchModel('membermasters/lookup', MemberMasterLookup.MEMBER_MASTER_ALL, MemberMasterLookup.MEMBER_MASTER_DEFAULT, []);
    // tslint:disable-next-line:max-line-length
    groupSearchModel = new SearchModel('groupmasters/lookup', GroupMasterLookup.GROUP_MASTER_ALL, GroupMasterLookup.GROUP_MASTER_DEFAULT, []);
    lastName: any;
    asOfDate:Date;
    constructor(
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        private alertMessageService: AlertMessageService,
        private memberMasterService: MemberMasterService,
        private modalService: NgbModal,
        private datePipe: DatePipe,
        private cdr: ChangeDetectorRef,
        private datePipeFormate: DateFormatPipe,
        private MemberEligHistoryService: MemberEligHistoryService,
        private messageService: MessageMasterDtlService,
        private renderer: Renderer2,
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.formValidation = new FormValidation(this.selectMemberForm);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getdisplayBenefitAccumSelectShortcutKeys(this));
        this.cdr.detectChanges();
    }

    createForm() {
        this.selectMemberForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: []}],
            subscriberId1: ['', {updateOn: 'blur', validators: [Validators.required]}],
            subscriberName: ['', {updateOn: 'blur', validators: []}],
            personNo: ['', {updateOn: 'blur', validators: [Validators.required]}],
            asOfDate: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    showPopUp(title: any, message: any) {
        let popMsg = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
            this.popUpButtonClicked(event);
        });
    }

    popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button Yes has been click!');
        }
    }

    onChangeSubscriberId(event:any) {
        this.memberMasterService.findBySubscriberId(event.target.value).subscribe(data => {
            if (data && data.length > 0) {
                this.selectMemberForm.patchValue({
                    asOfDate: this.datePipeFormate.defaultDisplayDateFormat(new Date())
                });
            } else {
                this.messageService.findByMessageId(14343).subscribe(res => {
                    this.showPopUpSubId('Select Member', '14343: ' + res[0].messageText);
                })
            }
        })
    }

    onChangePersonId(event: any) {
        this.memberMasterService.findBySubscriberIdAndPersonNumber(Form.getValue(this.selectMemberForm, 'subscriberId1'), event.target.value).subscribe(data => {
        this.asOfDate=new Date();
            if (data) {
                this.lastName = data[0].lastName + ' ' + data[0].firstName;
                this.selectMemberForm.patchValue({
                    diamondId: data[0].diamondId,
                    asOfDate:this.datePipeFormate.defaultDisplayDateFormat(this.datePipe.transform(this.asOfDate,'y-MM-d'))
                })
            } else {
                this.lastName = null;
                this.showPopUp('Error', '14344: Specified Member Does not exits')
            }
        })
    }

    search() {
        this.formValidation.validateForm();
        if (this.selectMemberForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.subscriberId = this.selectMemberForm.get('subscriberId1').value;
            memberMaster.personNumber = this.selectMemberForm.get('personNo').value;
            // tslint:disable-next-line:max-line-length
            this.memberMasterService.findBySubscriberIdAndPersonNumber(memberMaster.subscriberId, memberMaster.personNumber).subscribe(memberMasters => {
                this.memberMaster = new MemberMaster();
                if (memberMasters === null) {
                    this.showPopUp('Error', 'No Record')
                } else {
                    this.memberMasters = memberMasters;
                    if (this.memberMasters.length > 0) {
                        this.memberMaster = this.memberMasters[0];
                    }
                    var asofDate = Form.getDatePickerValue(this.selectMemberForm, 'asOfDate');
                    this.memberMaster.as_of_date = asofDate
                    this.MemberEligHistoryService.getMemberSeqEligHist(asofDate, this.selectMemberForm.get('subscriberId1').value, this.selectMemberForm.get('personNo').value).subscribe(data => {
                        if (data[0]) {
                            this.memberMaster.seqEligHist = data[0].seq_Elig_hist;
                            this.onRowSelected.emit(this.memberMaster);
                            this.close();

                        } else {
                            var effDate = new Date(0);
                            var msg = "The member is not eligible on As Of Date. This member's " +
                            "current eligibility period is " + ' ' + moment(effDate).format('MMM d, y') + ' ' + " through ";
                            this.MemberEligHistoryService.checkIfeligible(this.selectMemberForm.get('subscriberId1').value, this.selectMemberForm.get('personNo').value).subscribe(data => {
                                if (data.length > 0 && data.Term_date == null) {
                                    msg = msg + "today";
                                    effDate = data.effective_date;
                                    msg = "The member is not eligible on As Of Date. This member's " +
                                    "current eligibility period is " + ' ' + moment(effDate).format('MMM d, y') + ' ' + " through ";
                                    this.showPopUp("Select Member", "14348 " + msg);
                                } else {
                                    msg = msg +  moment(effDate).format('MMM d, y');
                                    this.showPopUp("Select Member", "14349 " + msg);
                                }
                            });
                            //this.showPopUp("Error","14349 This Member is not eligible on As Of Date");
                        }
                    })
                }
            });
        } else {
            // tslint:disable-next-line:max-line-length
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
        }
    }

    close() {
        this.activeModal.dismiss();
    }

    openLookupPage() {
        this.asOfDate=new Date();
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            this.selectMemberForm.patchValue({
                subscriberId1: resp.subscriberId,
                diamondId: resp.diamondId,
                subscriberName: resp.lastName,
                personNo: resp.personNumber,
                asOfDate: this.datePipeFormate.defaultDisplayDateFormat(this.datePipe.transform(this.asOfDate,'y-MM-d'))
            });
            this.lastName = resp.lastName + ' ' + resp.firstName;
        })
    }


    onLookupFieldChange(event: any) {
        this.asOfDate=new Date();
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupPage();
        } else if (event.target.value && event.key === 'Tab') {
            this.onChangeSubscriberId(event)
        }
        if (event.key === 'Tab') {
            this.selectMemberForm.patchValue({
                asOfDate:this.datePipeFormate.defaultDisplayDateFormat(this.datePipe.transform(this.asOfDate,'y-MM-d'))
            });
        }
    }

    showPopUpSubId(title: any, message: any) {
        let popMsg = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popMsg.buttons = [new PopUpMessageButton('yes', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
            if (event.name === 'yes') {
                const element = this.renderer.selectRootElement('#subscriberId1');
                setTimeout(() => element.focus(), 50);
            }
        });
    }
}
