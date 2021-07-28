/* Copyright (c) 2019 . All Rights Reserved. */

export class PopUpMessage {
    name: string;
    title: string;
    message: string;
    icon: string;
    buttons: PopUpMessageButton[];
    messageType?: MessageType;
    displayCloseBtn: boolean;
    buttonHeaderClass?: string;

    constructor(name: string, title: string, message: string, icon: string, button?: PopUpMessageButton[], messageType?: MessageType, closeButton?: boolean, buttonHeaderCSS?: string) {
        this.name = name;
        this.title = title;
        this.message = message;
        this.icon = icon;
        this.buttons = button ? button : [];
        this.messageType = messageType ? messageType : MessageType.ERROR;
        this.displayCloseBtn = closeButton ? closeButton: true;
        this.buttonHeaderClass = buttonHeaderCSS;
    }
}

export class PopUpMessageButton {
    name: string;
    text: string;
    cssClassName: string;
    popupMessage: PopUpMessage;
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
