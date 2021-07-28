/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {AuthenticationService} from '../../../api-services/authentication.service'
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
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

    selector: 'changepassword',
    templateUrl: './change-password.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        ChangePasswordService,
        AuthenticationService
    ]

})
export class ChangePasswordComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    changePasswordForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    private displayMessage: any;
    @Input() userNameInput: string;
    public popUpMessage: PopUpMessage;
    @Output() onChangePasswordSuccess = new EventEmitter<Object>();
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private changePasswordService: ChangePasswordService,
        private modelService: NgbModal,
        private toastService: ToastService,
        private router: Router,
        private authenticationService: AuthenticationService,
        private activeModal: NgbActiveModal
    ) { }


    changePassword() {
     
        if ((this.formValidation.isValidField('newPassword') && this.changePasswordForm.get('newPassword').errors.required) || (this.formValidation.isValidField('confirmPassword') &&  this.changePasswordForm.get('confirmPassword').errors.required)) {
            this.changePasswordForm.markAllAsTouched();
            this.showPopUp('Change Password', "11103: Please fill all required fields ");
            return;
        }
        if(this.formValidation.isValidField('newPassword') && this.changePasswordForm.get('newPassword').errors.minlength){
            this.showPopUp('Change Password','Password length should be greater then or equal to 8')
            return;
        }
        if(this.formValidation.isValidField('newPassword') && this.changePasswordForm.get('newPassword').errors.pattern ){
            this.showPopUp('Change Password','11107: Only Numbers,Alphabets and the speical characters _ $ and # are allowed.')
            return;
        }
        
        const oldPassword = this.changePasswordForm.get('oldPassword').value;
        const newPassword = this.changePasswordForm.get('newPassword').value;
        const confirmPassword = this.changePasswordForm.get('confirmPassword').value;
       
        let newPassFirst = newPassword.charAt(0);
        let check1=newPassFirst.match('^[a-zA-Z]{1}');
        if(!check1){
            this.showPopUp('Change Password','New Password should start from Alpha character')
            return;
        }
        let check2 = newPassword.match(
          "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"
        );
        if (!check2) {
            this.showPopUp(
              "Change Password",
              "Password must contain at least one digit, one character"
            );
            return;
        }

         if (oldPassword == newPassword && oldPassword == confirmPassword) {
           this.showPopUp(
             "Change Password",
             "11100:Password can not be used again"
           );
           return;
         }
        if(newPassword!=confirmPassword){
            this.showPopUp('Change Password','11104:The Password and the Confirmed Password do not match. Please type them again ')
            return;
        }
        if(oldPassword==newPassword && oldPassword==confirmPassword){
            this.showPopUp('Change Password','11100:Password can not be used again')
            return;
        }
         
        let userName = this.authenticationService.getActiveUser();
        userName = userName? userName: this.userNameInput;

        this.formValidation.validateForm();
        if (this.changePasswordForm.valid) {
            this.changePasswordService.changePassword(userName, oldPassword, newPassword).subscribe(response => {
                this.toastService.showToast('Password Successfully Changed', NgbToastType.Success);
                this.onChangePasswordSuccess.emit({success: true, newPassword});
                this.router.navigate(['diamond/functional-groups']);
            }, error => {
                this.popUpMessage = new PopUpMessage('poUpMessageName', 'Change Password', error.error.message, 'icon');
                this.popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
                let ref = this.modelService.open(PopUpMessageComponent, { size: 'lg' });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = this.popUpMessage;
            });
        }

    }


   showPopUp(title:any,message:any){
        this.popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
            this.popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
            let ref = this.modelService.open(PopUpMessageComponent, { size: 'lg' });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = this.popUpMessage;
            return;
   }

    private setUserName() {
        let userName = this.authenticationService.getActiveUser();
        userName = userName? userName: this.userNameInput;

        this.changePasswordForm.patchValue({
            'userId': userName,
        });
    }
    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.changePasswordForm);
        this.setUserName();
        this.setOldPassword();
    }
    cancel(){
        this.activeModal.close();
       this.router.navigateByUrl("/diamond/functional-groups");
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.changePasswordForm = this.formBuilder.group({
            userId: ['', { updateOn: 'blur', validators: [] }],
            oldPassword: ['', { updateOn: 'blur', validators: [Validators.required] }],
            newPassword: ['', { updateOn: 'blur', validators: [Validators.required,Validators.pattern('^[a-zA-Z0-9_$#]+$'),Validators.minLength(8)] }],
            confirmPassword: ['', { updateOn: 'blur', validators: [Validators.required] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    setOldPassword(){
      let password= localStorage.getItem("oldPassword");
        this.changePasswordForm.patchValue({
            'oldPassword': password,
        });
    }

}
