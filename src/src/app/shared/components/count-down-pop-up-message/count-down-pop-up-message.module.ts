/* Copyright (c) 2019 . All Rights Reserved. */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CountDownPopUpMessageComponent } from './count-down-pop-up-message/count-down-pop-up-message.component';


@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    providers: [

    ],
    declarations: [CountDownPopUpMessageComponent],
    exports: [CountDownPopUpMessageComponent]
})
export class CountDownPopUpMessageModule {
    constructor(@Optional() @SkipSelf() parentModule: CountDownPopUpMessageModule) {

    }
}