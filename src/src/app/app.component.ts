/* Copyright (c) 2020 . All Rights Reserved. */
/** Defines the root component for the application. */
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AlertMessage, AlertMessageService } from "./shared/components/alert-message";
import { Router } from '@angular/router'
import { AuthenticationService } from '../app/api-services/authentication.service';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {getShortcutMenuKeyEvent} from "./shared/services/shared.service";
import {FunctionalGroupShortCutComponent} from "./diamond/main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { localeData } from 'moment';
import { Session } from 'inspector';


@Component({
    selector: 'diamond-app',
    templateUrl: 'app.component.html',
    providers: [AuthenticationService]
})
export class AppComponent implements OnInit {
    alertMessage: AlertMessage;
    ipAddress: string;
    date: string;
    faSignOut = faSignOutAlt;
    faSignIn = faSignInAlt;
    faUserCircle = faUserCircle;
    shortcuts: ShortcutInput[] = [];
    constructor(private alertMessageService: AlertMessageService, router: Router,
                private cdr: ChangeDetectorRef,
                private modalService: NgbModal,
                private authenticationService: AuthenticationService) {
        router.events.subscribe((val) => {
            this.closeMessage();
        });
    }

    isAuthenticated() {
        return this.authenticationService.isAuthenticated();
    }

    logout() {
        localStorage.removeItem('oldPassword');
        sessionStorage.removeItem("selectedGroup");
        this.authenticationService.logout();
    }
    get activeUser() {
        return this.authenticationService.getActiveUser();
    }
    ngOnInit(): void {
        this.alertMessageService.alertMessage.subscribe((alertMessage: AlertMessage) => { this.alertMessage = alertMessage; });
        this.authenticationService.getIpAddress().subscribe(result => {
            this.ipAddress = result.ipAddress;
            this.date = result.date;
        });
    }

    closeMessage() {
        this.alertMessageService.close();
    };

    ngAfterViewInit(): void {
        this.shortcuts.push(...getShortcutMenuKeyEvent(this));
        this.cdr.detectChanges();
    };

    openFunctionalGroupShortcut() {
        const ref = this.modalService.open(FunctionalGroupShortCutComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }
}
