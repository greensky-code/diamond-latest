/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {ChangePasswordService} from '../../../api-services/change-password.service'
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {MessageMasterDtl} from '../../../api-models';
import {MessageMasterDtlService} from '../../../api-services';
// Use the Component directive to define the ChangePasswordComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'updateuserpassword',
    templateUrl: './update-user-password.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        ChangePasswordService
    ]

})
export class UpdateUserPasswordComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    updatePasswordForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public popUpMessage: PopUpMessage;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    private displayMessage: any;
    @Input() userId: any;
    @Output() buttonclickEvent = new EventEmitter<string>();

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private messageService: MessageMasterDtlService,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private changePasswordService: ChangePasswordService,
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


    updatePassword() {
        const password = this.updatePasswordForm.get('password').value;
        const userId = this.updatePasswordForm.get('userId').value;
        if(this.validatePassword(password)) {
            this.formValidation.validateForm();
            if (this.updatePasswordForm.valid) {
                this.changePasswordService.updatePassword(userId, password).subscribe(response => {
                    console.log(response);
                    // this.showPopUp('User Update Password', 'Password Successfully Updated')
                    if (response.success) {
                        this.activeModal.close();
                        this.toastr.showToast('Successfully Updated Password', NgbToastType.Success);
                    } else {
                        this.showPopUp('Update User Password', response.message);
                    }
                }, error => {
                    this.showPopUp('Update User Password', error.error.message);
                })
            }
        }
    }

    validatePassword = (password) => {
        if(password.length == 0) {
            this.showValidationError(29029, '@1', 'Password');
            return false;
        }
        else if(password[0] !== password[0].toUpperCase()) {
            this.showValidationError(11106);
            return false;
        } else if(password.length < 6 || password.length > 30) {
            this.showValidationError(11105);
            return false;
        } else if(!(/^[a-zA-Z0-9_$#]+$/.test(password))) {
            this.showValidationError(11107);
            return false;
        }
        return true;
    }

    showValidationError = (code: number, replaceKey?: string, replaceValue?: string) => {
        this.messageService
            .findByMessageId(code)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    "Add Database User",
                    [code, replaceKey? message[0].messageText.replace(replaceKey, replaceValue): message[0].messageText].join(": ")
                );
            });
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
