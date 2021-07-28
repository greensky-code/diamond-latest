/* Copyright (c) 2019 . All Rights Reserved. */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ConfirmationMessageComponent } from './confirmation-message/confirmation-message.component';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    providers: [
        
    ],
    declarations: [ConfirmationMessageComponent],
    exports: [ConfirmationMessageComponent]
})
export class ConfirmationMessageModule {
    constructor(@Optional() @SkipSelf() parentModule: ConfirmationMessageModule) {

    }
}
