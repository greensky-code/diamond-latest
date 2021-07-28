/* Copyright (c) 2020 . All Rights Reserved. */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AlertMessageService } from './alert.message.service';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        AlertMessageService
    ],
    declarations: [AlertMessageComponent],
    exports: [AlertMessageComponent]
})
export class AlertMessageModule {
    constructor(@Optional() @SkipSelf() parentModule: AlertMessageModule) {

    }
}