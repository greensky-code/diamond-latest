/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {GroupMaster} from '../../../api-models'
import {GroupMasterService} from '../../../api-services/group-master.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {getGroupUserFieldsShortcutKeys} from '../../../shared/services/shared.service';

import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {DatePickerConfig} from '../../../shared/config';
import {CommonService} from '../../../shared/services/common.service';
import {RequiredValidator} from '../../../shared/validators/required.validator';
import {DddwDtlService, ReasonCodeMasterService} from '../../../api-services';
import {CountryService} from '../../../api-services/country.service';
import {Form} from '../../../shared/helpers/form.helper';
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {DynamicUserDefinedFieldsComponent} from '../../../shared/components/dynamic-user-defined-fields/dynamic-user-defined-fields.component';
import {UserDefinedTextService} from '../../../api-services/user-defined-text.service';
import {UserDefinedValdtCodesService} from '../../../api-services/user-defined-valdt-codes.service';
import {LanguageMasterService} from '../../../api-services/language-master.service';
// Use the Component directive to define the GroupUserFieldsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "groupuserfields",
    templateUrl: "./group-user-fields.component.html",
    providers: [UserDefinedTextService, UserDefinedValdtCodesService, LanguageMasterService]
})
export class GroupUserFieldsComponent implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @ViewChild(DynamicUserDefinedFieldsComponent, {static: false}) userDefinedFields: DynamicUserDefinedFieldsComponent;
    @Input() winID?: string = 'GROUP';
    @Input() dataWindowId?: string = 'dw_group_user_fields_de';
    groupUserFieldsForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    groupUserid: string;
    popUpMessage: PopUpMessage;
    editGroupMaster: boolean;
    @Input() groupMaster: GroupMaster;
    groupMasters: GroupMaster[];
    public datePickerConfig = DatePickerConfig;
    @Input() showIcon: boolean = false;
    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;
    submitForm = new EventEmitter<any>();
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;

    // Use constructor injection to inject an instance of a FormBuilder

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        public activeModal: NgbActiveModal,
        public commonService: CommonService,
        private groupMasterService: GroupMasterService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private countryService: CountryService,
        private dddwDtlService: DddwDtlService,
        private userDefinedValidateCodeService: UserDefinedValidateCodeService,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.groupUserFieldsForm);
        this.populateFormField(this.groupMaster);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getGroupUserFieldsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    showPopUp() {
        this.popUpMessage = new PopUpMessage(
            "poUpMessageName",
            "Pop-up message title",
            "Pop-up message",
            "icon"
        );
        this.popUpMessage.buttons = [
            new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("no", "No", "btn btn-primary"),
        ];
        this.child.showMesssage();
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === "yes") {
            console.log("button yes has been click!");
        }
        if (button.name === "no") {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: any) {
        if (button.popupMessage.name === "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }

    checkGroupUserFieldsValidation(groupUserFields: any): boolean {
        let status = true;
        let message: PopUpMessage;
        if (
            !groupUserFields ||
            !groupUserFields.situsLocation ||
            groupUserFields.situsLocation === ""
        ) {
            status = false;
            let ref = this.modalService.open(PopUpMessageComponent, {
                backdrop: false,
            });
            ref.componentInstance.showIcon = true;
            message = new PopUpMessage(
                "Situs Location",
                "Situs Location",
                " Situs Location : value required for user_defined_12",
                "info",
                [],
                MessageType.ERROR,
                false
            );
            message.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
            message.messageType = MessageType.ERROR;
            message.title = "Situs Location Required";
            message.icon = "info";
            ref.componentInstance.popupMessage = message;
            this.toastService.showToast(
                "Situs Location : value required for user_defined_12",
                NgbToastType.Danger
            );
        } else if (
            !groupUserFields.restrictedAddr ||
            groupUserFields.restrictedAddr === ""
        ) {
            status = false;
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            message = new PopUpMessage(
                "Restricted Addr",
                "Restricted Addr",
                " Restricted Addr: value required for user_defined_6",
                "info",
                [],
                MessageType.ERROR
            );
            message.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
            message.messageType = MessageType.ERROR;
            message.title = "Restricted Addr Required";
            message.icon = "info";
            ref.componentInstance.popupMessage = message;
            this.toastService.showToast(
                "Restricted Addr: value required for user_defined_6",
                NgbToastType.Danger
            );
        }
        return status;
    }

    populateFormField(groupMaster: GroupMaster) {
        setTimeout(() => {
            this.userDefinedFields.updateUserDefinedValues(this.groupMaster);
            this.groupUserFieldsForm.controls.comments.setValue(this.groupMaster.comments);
        }, 100);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.groupUserFieldsForm = this.formBuilder.group({
            groupName1: [null, {validators: []}],
            groupName2: [null, {validators: []}],
            holdReason: [null, {validators: []}],
            holdDate: [null, {validators: []}],
            nextOpenStartDt: [null, {validators: []}],
            nextOpenEndDate: [null, {validators: []}],
            shortName: [null, {validators: []}],
            address1: [null, {validators: []}],
            address2: [null, {validators: []}],
            city: [null, {validators: []}],
            stateProv: [null, {validators: []}],
            zippost: [null, {validators: []}],
            country: [null, {validators: []}],
            groupType: [null, {validators: []}],
            idPrintCode: [null, {validators: []}],
            userDate3: [null, {validators: []}],
            doNotUse: [null, {validators: []}],
            userDate4: [null, {validators: []}],
            specialSubro: [null, {validators: []}],
            userDate5: [null, {validators: []}],
            restrictedAddr: [null, {validators: [Validators.required, RequiredValidator.cannotContainSpace]}],
            userDate6: [null, {validators: []}],
            fullfillmentKits: [null, {validators: [Validators.required, RequiredValidator.cannotContainSpace]}],
            userDate7: [null, {validators: []}],
            usviNetwork: [null, {validators: []}],
            userDate8: [null, {validators: []}],
            cliceAppRecd: [null, {validators: []}],
            userDate9: [null, {validators: []}],
            cignalIntHlthSer: [null, {validators: []}],
            userDate10: [null, {validators: []}],
            userDefined11: [null, {validators: []}],
            userDate11: [null, {validators: []}],
            situsLocation: ["", {validators: [Validators.required, RequiredValidator.cannotContainSpace]}],
            userDate12: [null, {validators: []}],
            tieredPlan: [null, {validators: []}],
            userDate13: [null, {validators: []}],
            test: [null, {validators: []}],
            userDate14: [null, {validators: []}],
            careAlliesGroup: [null, {validators: []}],
            userDate15: [null, {validators: []}],
            origin: [null, {validators: []}],
            userDate16: [null, {validators: []}],
            mhpExempt: [null, {validators: []}],
            userDate17: [null, {validators: []}],
            userDefined18: [null, {validators: []}],
            userDate18: [null, {validators: []}],
            userDefined19: [null, {validators: []}],
            userDate19: [null, {validators: []}],
            exclDenClmPric: [null, {validators: []}],
            userDate20: [null, {validators: []}],
            nonErisaGrp: [null, {validators: [Validators.required, RequiredValidator.cannotContainSpace]}],
            userDate21: [null, {validators: []}],
            userDefined22: [null, {validators: []}],
            userDate22: [null, {validators: []}],
            comments: [null, {validators: []}],
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    update() {
        this.groupMaster.userDefined3 = this.userDefinedFields.userDefinedFieldForm.get('userDefined3').value;
        this.groupMaster.userDefined4 = this.userDefinedFields.userDefinedFieldForm.get('userDefined4').value;
        this.groupMaster.userDefined5 = this.userDefinedFields.userDefinedFieldForm.get('userDefined5').value;
        this.groupMaster.userDefined6 = this.userDefinedFields.userDefinedFieldForm.get('userDefined6').value;
        this.groupMaster.userDefined7 = this.userDefinedFields.userDefinedFieldForm.get('userDefined7').value;
        this.groupMaster.userDefined8 = this.userDefinedFields.userDefinedFieldForm.get('userDefined8').value;
        this.groupMaster.userDefined9 = this.userDefinedFields.userDefinedFieldForm.get('userDefined9').value;
        this.groupMaster.userDefined10 = this.userDefinedFields.userDefinedFieldForm.get('userDefined10').value;
        this.groupMaster.userDefined11 = this.userDefinedFields.userDefinedFieldForm.get('userDefined11').value;
        this.groupMaster.userDefined12 = this.userDefinedFields.userDefinedFieldForm.get('userDefined12').value;
        this.groupMaster.userDefined13 = this.userDefinedFields.userDefinedFieldForm.get('userDefined13').value;
        this.groupMaster.userDefined14 = this.userDefinedFields.userDefinedFieldForm.get('userDefined14').value;
        this.groupMaster.userDefined15 = this.userDefinedFields.userDefinedFieldForm.get('userDefined15').value;
        this.groupMaster.userDefined16 = this.userDefinedFields.userDefinedFieldForm.get('userDefined16').value;
        this.groupMaster.userDefined17 = this.userDefinedFields.userDefinedFieldForm.get('userDefined17').value;
        this.groupMaster.userDefined18 = this.userDefinedFields.userDefinedFieldForm.get('userDefined18').value;
        this.groupMaster.userDefined19 = this.userDefinedFields.userDefinedFieldForm.get('userDefined19').value;
        this.groupMaster.userDefined20 = this.userDefinedFields.userDefinedFieldForm.get('userDefined20').value;
        this.groupMaster.userDefined21 = this.userDefinedFields.userDefinedFieldForm.get('userDefined21').value;
        this.groupMaster.userDefined22 = this.userDefinedFields.userDefinedFieldForm.get('userDefined22').value;
        this.groupMaster.userDate3 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate3');
        this.groupMaster.userDate4 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate4');
        this.groupMaster.userDate5 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate5');
        this.groupMaster.userDate6 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate6');
        this.groupMaster.userDate7 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate7');
        this.groupMaster.userDate8 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate8');
        this.groupMaster.userDate9 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate9');
        this.groupMaster.userDate10 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate10');
        this.groupMaster.userDate11 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate11');
        this.groupMaster.userDate12 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate12');
        this.groupMaster.userDate13 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate13');
        this.groupMaster.userDate14 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate14');
        this.groupMaster.userDate15 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate15');
        this.groupMaster.userDate16 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate16');
        this.groupMaster.userDate17 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate17');
        this.groupMaster.userDate18 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate18');
        this.groupMaster.userDate19 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate19');
        this.groupMaster.userDate20 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate20');
        this.groupMaster.userDate21 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate21');
        try {
            this.groupMaster.userDate22 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate22');
        } catch (e) {}
        this.groupMaster.comments = this.groupUserFieldsForm.get('comments').value;
        this.updateGrpMaster(this.groupMaster.seqGroupId);
    }

    updateGrpMaster(seqGroupId: number) {
        this.formValidation.validateForm();
        if (this.userDefinedFields.userDefinedFieldForm.valid) {
            if (seqGroupId) {
                this.groupMasterService.updateGroupMaster(this.groupMaster, seqGroupId).subscribe(response => {
                    this.toastService.showToast('Record Updated Successfully', NgbToastType.Success);
                    setTimeout(() => {
                        this.submitForm.emit(this.groupMaster);
                        this.activeModal.close()
                    }, 2000);
                });
            } else {
                this.submitForm.emit(this.groupMaster);
                this.activeModal.close();
            }
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }

    close() {
        this.activeModal.close();
    }

}
