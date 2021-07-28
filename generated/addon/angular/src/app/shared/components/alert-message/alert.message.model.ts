/* Copyright (c) 2021 . All Rights Reserved. */

export class AlertMessage {
    show: boolean;
    message: string;
    alertClass: string

    constructor(show: boolean, message: string, alertClass:string) {
        this.show = show;
        this.message = message;
        this.alertClass = alertClass;
    }
}