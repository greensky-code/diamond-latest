/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AlertMessage } from './alert.message.model';

@Injectable({
    providedIn: "root"
})
export class AlertMessageService {
    public alertMessage: BehaviorSubject<AlertMessage> = new BehaviorSubject<AlertMessage>({ show: false, message: '', alertClass: 'alert-info' });

    info(message: string) {
        let alertMessageObject: AlertMessage = { show: true, message: message, alertClass:'alert alert-info' };
        this.alertMessage.next(alertMessageObject);
        return alertMessageObject;
    }

    warning(message: string) {
        let alertMessageObject: AlertMessage = { show: true, message: message, alertClass:'alert alert-warning' };
        this.alertMessage.next(alertMessageObject);
        return alertMessageObject;
    }

    success(message: string) {
        let alertMessageObject: AlertMessage = { show: true, message: message, alertClass:'alert alert-success' };
        this.alertMessage.next(alertMessageObject);
        return alertMessageObject;
    }

    error(message: string) {
        let alertMessageObject: AlertMessage = { show: true, message: message, alertClass:'alert alert-danger' };
        this.alertMessage.next(alertMessageObject);
        return alertMessageObject;
    }

    show(message: string, alertClass: string) {
        let alertMessageObject: AlertMessage = { show: true, message: message, alertClass:alertClass };
        this.alertMessage.next(alertMessageObject);
        return alertMessageObject;
    }

    close() {
        let alertMessageObject: AlertMessage = { show: false, message: '', alertClass:'' };
        this.alertMessage.next(alertMessageObject);
        return alertMessageObject;
    }
}