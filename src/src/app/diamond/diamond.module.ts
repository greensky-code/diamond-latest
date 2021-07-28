/* Copyright (c) 2020 . All Rights Reserved. */

/**
 * Declares all of the components that are used inside the Diamond feature module
 * and provides any services for the Diamond feature module.
 *
 * Angular modules are often used to group a set of code for a set of views for a feature area from
 * a user's point of view. For example, in the Tour of Heros tutorial on the Angular website,
 * "Heros" is a "feature" (sometimes also called a "feature set" or perhaps a "subject area").
 * Therefore, a Feature Module Typescript File is used to declare all of the components that are
 * used inside a feature module and provides any services defined as part of the feature module.
 * The term Feature Module is used and described in more detail
 * in the Angular 2: First Look training course on Pluralsight.com.
 */
import {NgModule} from '@angular/core';
import {diamondRoutedComponents, DiamondRoutingModule} from './diamond-routing.module';
import {PopUpMessageModule} from "../shared/components/pop-up-message/pop-up.message.module";
import {PopUpMessageComponent} from '../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faCalendar, faWindowClose} from '@fortawesome/free-regular-svg-icons';
import {SharedModule} from './../shared/shared.module';
import {MainMenuModule} from "./main-menu/main-menu.module";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        PopUpMessageModule,
        DiamondRoutingModule,
        MainMenuModule,
        SharedModule
    ],
    providers: [NgbActiveModal],
    // declare the routed components that are defined in the routing module for this feature
    declarations: [diamondRoutedComponents],
    exports: [],
    entryComponents: [PopUpMessageComponent]
})
export class DiamondModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faCalendar, faWindowClose)
    }
}
