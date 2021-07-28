import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberMaster, MessageMasterDtl, UserDefinedText } from '../../../api-models';
import { MessageMasterDtlService } from '../../../api-services';
import { LanguageMasterService } from '../../../api-services/language-master.service';
import { UserDefinedTextService } from '../../../api-services/user-defined-text.service';
import { UserDefinedValdtCodesService } from '../../../api-services/user-defined-valdt-codes.service';
import { DatePickerConfig } from '../../config';
import { Form } from '../../helpers/form.helper';
import { FormValidation } from '../../validators/form-validation.pipe';
import { AlertMessage } from '../alert-message';
import { DynamicUserDefinedFieldsComponent } from '../dynamic-user-defined-fields/dynamic-user-defined-fields.component';
import { PopUpMessageComponent } from '../pop-up-message/pop-up-message/pop-up-message.component';
import { PopUpMessage, PopUpMessageButton } from '../pop-up-message/pop-up.message.model';

@Component({
    selector: 'app-member-user-defined-fields',
    templateUrl: './member-user-defined-fields.component.html',
    providers: [UserDefinedTextService, UserDefinedValdtCodesService, LanguageMasterService]
})
export class MemberUserDefinedFieldsComponent implements OnInit, AfterViewInit {

    @ViewChild(DynamicUserDefinedFieldsComponent, { static: false }) userDefinedFields: DynamicUserDefinedFieldsComponent;
    memberUserDefinedFieldForm: FormGroup;
    @Input() winID?: string;
    @Input() dataWindowId?: string;
    @Input() memberMaster: MemberMaster;
    @Input() hasUpdatePermission?:boolean = false;
    @Output() onSubmit = new EventEmitter<any>();
    popUpMessage: PopUpMessage;

    @Input() showIcon: boolean = false;
    userDefinedTexts: UserDefinedText[] = [];
    public alertMessage: AlertMessage;
    @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
    public datePickerConfig = DatePickerConfig;
    formValidation: FormValidation;
    status: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private messageService: MessageMasterDtlService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
        this.memberUserDefinedFieldForm = this.formBuilder.group({}, { updateOn: 'submit' });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.userDefinedFields.updateUserDefinedValues(this.memberMaster);
        }, 200);
    }


    popUpButtonHandler(button: any) {
        if (button.popupMessage.name === "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }


    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === "yes") {
            console.log("button yes has been click!");
        }
        if (button.name === "no") {
            console.log("button No has been click!");
        }
    }

    close() {
        this.activeModal.close();
    }

    isSuperUser = false;
    update() {
        if (this.isSuperUser) {
            this.submitMember();
        } else {
            if (this.hasUpdatePermission) {
                this.submitMember();
            } else {
                this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Member Master')
                });
            }
        }
    }


    submitMember() {
        this.memberMaster.userDefined3 = this.userDefinedFields.userDefinedFieldForm.get('userDefined3').value;
        this.memberMaster.userDefined4 = this.userDefinedFields.userDefinedFieldForm.get('userDefined4').value;
        this.memberMaster.userDefined5 = this.userDefinedFields.userDefinedFieldForm.get('userDefined5').value;
        this.memberMaster.userDefined6 = this.userDefinedFields.userDefinedFieldForm.get('userDefined6').value;
        this.memberMaster.userDefined7 = this.userDefinedFields.userDefinedFieldForm.get('userDefined7').value;
        this.memberMaster.userDefined8 = this.userDefinedFields.userDefinedFieldForm.get('userDefined8').value;
        this.memberMaster.userDefined9 = this.userDefinedFields.userDefinedFieldForm.get('userDefined9').value;
        this.memberMaster.userDefined10 = this.userDefinedFields.userDefinedFieldForm.get('userDefined10').value;
        this.memberMaster.userDefined11 = this.userDefinedFields.userDefinedFieldForm.get('userDefined11').value;
        this.memberMaster.userDefined12 = this.userDefinedFields.userDefinedFieldForm.get('userDefined12').value;
        this.memberMaster.userDefined13 = this.userDefinedFields.userDefinedFieldForm.get('userDefined13').value;
        this.memberMaster.userDefined14 = this.userDefinedFields.userDefinedFieldForm.get('userDefined14').value;
        this.memberMaster.userDefined15 = this.userDefinedFields.userDefinedFieldForm.get('userDefined15').value;
        this.memberMaster.userDefined16 = this.userDefinedFields.userDefinedFieldForm.get('userDefined16').value;
        this.memberMaster.userDefined17 = this.userDefinedFields.userDefinedFieldForm.get('userDefined17').value;
        this.memberMaster.userDefined18 = this.userDefinedFields.userDefinedFieldForm.get('userDefined18').value;
        this.memberMaster.userDefined19 = this.userDefinedFields.userDefinedFieldForm.get('userDefined19').value;
        this.memberMaster.userDefined20 = this.userDefinedFields.userDefinedFieldForm.get('userDefined20').value;
        this.memberMaster.userDefined21 = this.userDefinedFields.userDefinedFieldForm.get('userDefined21').value;
        this.memberMaster.userDefined22 = this.userDefinedFields.userDefinedFieldForm.get('userDefined22').value;
        this.memberMaster.userDate1 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate1');
        this.memberMaster.userDate2 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate2');
        this.memberMaster.userDate3 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate3');
        this.memberMaster.userDate4 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate4');
        this.memberMaster.userDate5 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate5');
        this.memberMaster.userDate6 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate6');
        this.memberMaster.userDate7 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate7');
        this.memberMaster.userDate8 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate8');
        this.memberMaster.userDate9 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate9');
        this.memberMaster.userDate10 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate10');
        this.memberMaster.userDate11 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate11');
        this.memberMaster.userDate12 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate12');
        this.memberMaster.userDate13 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate13');
        this.memberMaster.userDate14 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate14');
        this.memberMaster.userDate15 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate15');
        this.memberMaster.userDate16 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate16');
        this.memberMaster.userDate17 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate17');
        this.memberMaster.userDate18 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate18');
        this.memberMaster.userDate19 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate19');
        this.memberMaster.userDate20 = Form.getDatePickerValue(this.userDefinedFields.userDefinedFieldForm, 'userDate20');
        this.onSubmit.emit(this.memberMaster);
    }

    form1PopupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Ok') {
                    ref.componentInstance.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

}
