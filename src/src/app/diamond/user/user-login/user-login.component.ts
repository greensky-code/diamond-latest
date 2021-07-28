/* Copyright (c) 2020 . All Rights Reserved. */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { SecUserService } from '../../../api-services/sec-user.service';
import { SystemParameterService } from '../../../api-services/system-parameter.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AUTHENTICATED_USER, AuthenticationService, ACCESS_TOKEN, REFRESH_TOKEN} from '../../../api-services/authentication.service';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { NgxSpinnerService } from "ngx-spinner";
import {MessageMasterDtl, SecUser} from '../../../api-models';
import { SecFuncService } from '../../../api-services/security/sec-func.service';
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {MessageMasterDtlService} from "../../../api-services";

// Use the Component directive to define the UserLoginComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'userlogin',
    templateUrl: './user-login.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecUserService,
        SystemParameterService,
        AuthenticationService,
        SecFuncService
    ]

})
export class UserLoginComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    userLoginForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    private displayMessage: any;
    public popUpMessage: PopUpMessage;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    functions: string[] = [];
    isSuperUser: boolean = false;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private router: Router,
        private secUserService: SecUserService,
        private systemParameterService: SystemParameterService,
        private secFuncService: SecFuncService,
        private authenticationService: AuthenticationService,
        private toastService: ToastService,
        private spinner: NgxSpinnerService,
        private modalService: NgbModal,
        private messageService: MessageMasterDtlService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {

        if (sessionStorage.getItem('isLogin')) {
            this.router.navigate(['diamond/functional-groups']);
        }
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.userLoginForm);
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    submit() {
        let userName = this.userLoginForm.get('username').value;
        const password = this.userLoginForm.get('password').value;
        // const server = this.userLoginForm.get('server').value;
        this.formValidation.validateForm();
        if (this.userLoginForm.valid) {
            //Checking if checkbox is checked
            this.spinner.show();
            userName = userName.toUpperCase();
            this.login(userName, password);
        }
    }

    login(userName, password) {
        this.authenticationService.authenticate(userName, password).subscribe(user => {
            this.spinner.hide();
            localStorage.setItem("oldPassword", password);
            if (user.success) {
                this.authenticationService.setActiveUser(userName);
                this.authenticationService.setAuthenticated();
                this.checkTemplateIdByLoggedInUser(userName);
                this.spinner.hide();
                let element = <HTMLInputElement>document.getElementById("change-password");
                let isChecked = element.checked;
                if (isChecked) {
                    this.router.navigate(['diamond/user/change-password']);
                }
                else {
                    this.router.navigate(['diamond/functional-groups']);
                }
            } else {
                if (user.message.includes('11099')) {
                    this.authenticationService.authenticateCount++;
                    this.showPopUp(user.message, 'Diamond Client/Server System');
                    return;
                }
                this.authenticationService.authenticateCount = 0;
                this.toastService.showToast(user.message, NgbToastType.Danger);
            }
        }, error => {
            this.spinner.hide();
            this.toastService.showToast('User login failed.' + error.error.message, NgbToastType.Danger);
        });
    }


    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage("poUpMessageName", title, message, "icon");
        popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Ok') {
                let userName = this.userLoginForm.get('username').value;

                const passwComponentRef = this.modalService.open(ChangePasswordComponent);
                passwComponentRef.componentInstance.userNameInput = userName;
                passwComponentRef.componentInstance.onChangePasswordSuccess.subscribe(resp => {
                    if (resp.success && this.userLoginForm.valid) {
                        this.authenticationService.authenticateCount = 2;
                        this.login(userName, resp.newPassword);
                        passwComponentRef.dismiss();
                    }
                })
            }
        });
    }




    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.userLoginForm = this.formBuilder.group({
            username: ['', { validators: [Validators.required] }],
            password: ['', { validators: [Validators.required] }],
            // server: ['', {validators: [Validators.required] }],
            allRightsReserved: ['', { validators: [] }],
            proprietaryRightsNotice: ['', { validators: [] }],
            agreementsWhichGrantSpecifi: ['', { validators: [] }]
        });
    }

    checkTemplateIdByLoggedInUser(loggedUserId: string) {
        this.secUserService.getSecUser(loggedUserId).subscribe(secUserObj => {
            let secUser = new SecUser();
            secUser = secUserObj;
            let dfltTemplate = secUser.dfltTemplate;
            if (dfltTemplate === null || dfltTemplate === undefined) {
                dfltTemplate = secUser.userId;
            }
            this.checkIsSuperUser(dfltTemplate, secUser.userId);

        }, error => {

        });

    }


    getFunctionsIds(templateId: string, userId: string) {
        this.functions = [];
        this.secFuncService.getFuncIdsByUserIdAndTemplateid(templateId, userId).subscribe(functionsId => {
            if (functionsId) {
                this.functions = functionsId;
                sessionStorage.setItem("functionIds", JSON.stringify(this.functions));
            } else {
                this.messageService.findByMessageId(29055).subscribe((message: MessageMasterDtl[]) => {
                    this.nonAccessMessagePopup('29055: ' + message[0].messageText.replace('@1', userId).replace('@2', 'MAINMENU'), 'DIAMOND@ Client/Server System')
                });
            }
        }, error => {
            this.functions = [];
            sessionStorage.setItem("functionIds", JSON.stringify(this.functions));
        });
    }

    checkIsSuperUser(dfltTemplate: string, userId: string) {
        this.secUserService.getSecUser(dfltTemplate).subscribe(secUserObj => {
            let secUser = new SecUser();
            secUser = secUserObj;
            if (secUser.suPriv === 'Y') {
                this.isSuperUser = true;
                sessionStorage.setItem("isSuperUser", JSON.stringify(this.isSuperUser));
            } else {
                this.isSuperUser = false;
                sessionStorage.setItem("isSuperUser", JSON.stringify(false));
                this.getFunctionsIds(dfltTemplate, userId);
            }
        }, error => {
            this.isSuperUser = false;
            sessionStorage.setItem("isSuperUser", JSON.stringify(false));
            this.getFunctionsIds(dfltTemplate, userId);
        });
    }

    nonAccessMessagePopup(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage("poUpMessageName", title, message, "icon");
        popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        popUpMessage.displayCloseBtn = false;
        let ref = this.modalService.open(PopUpMessageComponent, {backdrop: 'static', keyboard: false});
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Ok') {
                this.authenticationService.logout();
                this.router.navigate(['diamond/user/login']);
            }
        });
    }
}
