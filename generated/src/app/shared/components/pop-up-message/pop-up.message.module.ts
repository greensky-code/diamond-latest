/* Copyright (c) 2019 . All Rights Reserved. */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { PopUpMessageComponent } from './pop-up-message/pop-up-message.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        
    ],
    declarations: [PopUpMessageComponent],
    exports: [PopUpMessageComponent]
})
export class PopUpMessageModule {
    constructor(@Optional() @SkipSelf() parentModule: PopUpMessageModule) {

    }
}