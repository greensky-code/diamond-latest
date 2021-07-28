/* Copyright (c) 2019 . All Rights Reserved. */

export class CountDownPopUpMessage {
    name: string;
    title: string;
    message: string;
    message1: string;
    icon: string;
    buttons: CountDownPopUpMessageButton[];
    messageType?: MessageType;
    displayCloseBtn: boolean;
    buttonHeaderClass?: string;

    constructor(name: string, title: string, message: string, icon: string, button?: CountDownPopUpMessageButton[], messageType?: MessageType, closeButton?: boolean, buttonHeaderCSS?: string, message1?: string) {
        this.name = name;
        this.title = title;
        this.message = message;
        this.message1 = message1;
        this.icon = icon;
        this.buttons = button ? button : [];
        this.messageType = messageType ? messageType : MessageType.ERROR;
        this.displayCloseBtn = closeButton ? closeButton : false;
        this.buttonHeaderClass = buttonHeaderCSS;
    }
}

export class CountDownPopUpMessageButton {
    name: string;
    text: string;
    cssClassName: string;
    popupMessage: CountDownPopUpMessage;
    disabled?: boolean;

    constructor(name: string, text: string, cssClassName: string, disabled?: boolean) {
        this.name = name;
        this.text = text;
        this.cssClassName = cssClassName;
        this.disabled = disabled;
    }
}

export enum MessageType {
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}
