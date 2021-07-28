/* Copyright (c) 2019 . All Rights Reserved. */

export class PopUpMessage {
    name: string
    title: string;
    message: string;
    icon: string
    buttons: PopUpMessageButton[];
    constructor(name: string, title: string, message: string, icon :string) {
        this.name = name;
        this.title = title;
        this.message = message;
        this.icon = icon;
    }
}

export class PopUpMessageButton {
    name: string;
    text: string;
    cssClassName: string;
    popupMessage: PopUpMessage
    constructor(name: string, text: string, cssClassName:string) {
        this.name = name;
        this.text = text;
        this.cssClassName = cssClassName;
    }
}