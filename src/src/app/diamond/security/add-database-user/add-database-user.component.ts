import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastType } from 'ngb-toast';
import { AddDatabaseUser } from '../../../api-models/add-database-user';
import { AddDatabaseUserService } from '../../../api-services/add-database-user.service';
import { ChangePasswordService } from '../../../api-services/change-password.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';

@Component({
  selector: 'app-add-database-user',
  templateUrl: './add-database-user.component.html',
  styleUrls: ['./add-database-user.component.css']
})
export class AddDatabaseUserComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    updatePasswordForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public popUpMessage: PopUpMessage;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    private displayMessage: any;
    @Input() userId: any;
    @Input() usePassProfileStatus:boolean;
    @Output() buttonclickEvent = new EventEmitter<string>();

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private addDatabaseUserService: AddDatabaseUserService,
        private modelService: NgbModal,
        private router: Router
    ) {}

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.updatePasswordForm);
        if (this.userId) {
            this.updatePasswordForm.patchValue({
                userId: this.userId
            });
        }
    }


    addDatabaseUser() {
        const password = this.updatePasswordForm.get('password').value;
        const userId = this.updatePasswordForm.get('userId').value;
        this.formValidation.validateForm();
        if (this.updatePasswordForm.valid) {
            let addDatabaseUser=new AddDatabaseUser();
            addDatabaseUser.userId=userId;
            addDatabaseUser.password=password;
            addDatabaseUser.usePassProfileStatus=this.usePassProfileStatus;
            this.addDatabaseUserService.addDatabaseUser(addDatabaseUser).subscribe(response => {
                console.log(response);
                // this.showPopUp('User Update Password', 'Password Successfully Updated')
                if (response.success) {
                    this.activeModal.close();
                    this.toastr.showToast('Database User Added Successfully', NgbToastType.Success);
                } else {
                    this.showPopUp('', response.message);
                }
            }, error => {
                this.showPopUp('', error.error.message);
            })
        }
    }




    showPopUp(title: any, message: any) {
        this.popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modelService.open(PopUpMessageComponent, {size: 'lg'});
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = this.popUpMessage;
        return;
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.updatePasswordForm = this.formBuilder.group({
            userId: ['', {validators: [Validators.required]}],
            password: ['', {
                validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_$#]+$'),
                    Validators.minLength(6), Validators.maxLength(30)]
            }],
            confirmPassword: ['', {
                validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_$#]+$'),
                    Validators.minLength(6), Validators.maxLength(30),
                    this.samePassword]
            }]
        });
    }

    samePassword(control: FormControl) {
        if (!control || !control.parent) {
            return null;
        }
        if (control.value !== control.parent.get('password').value) {
            return {'passwordMismatch': true}
        }
        return null;
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    setOldPassword() {
        let password = localStorage.getItem('oldPassword');
        this.updatePasswordForm.patchValue({
            'oldPassword': password,
        });
    }

}
