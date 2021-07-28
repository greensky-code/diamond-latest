/* Copyright (c) 2021 . All Rights Reserved. */
/** Defines the root component for the application. */
import { Component, OnInit } from '@angular/core';
import { AlertMessageService, AlertMessage } from "./shared/components/alert-message";
import { Router } from '@angular/router'

@Component({
    selector: 'diamond-app',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    alertMessage: AlertMessage

    constructor(private alertMessageService: AlertMessageService, router:Router) {
        router.events.subscribe((val) => {
            this.closeMessage();
        });
    }

    ngOnInit(): void {
        this.alertMessageService.alertMessage.subscribe((alertMessage: AlertMessage) => { this.alertMessage = alertMessage; });
    }

    closeMessage() {
        this.alertMessageService.close();
    }
}