/* Copyright (c) 2021 . All Rights Reserved. */

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
import { DiamondRoutingModule, diamondRoutedComponents }  from './diamond-routing.module';
 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { TextMaskModule } from 'angular2-text-mask';
 import { FileUploadModule } from 'ng2-file-upload';
 import { AlertMessageModule } from "../shared/components/alert-message/alert.message.module";
 import { PopUpMessageModule } from "../shared/components/pop-up-message/pop-up.message.module";
 import { PopUpMessageComponent } from '../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
 import { AngularMyDatePickerModule } from 'angular-mydatepicker';
 import { AgGridModule } from 'ag-grid-angular';
 import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
 
@NgModule({
  imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMyDatePickerModule,
        TextMaskModule,
        AgGridModule.withComponents([]),
        FileUploadModule,
        AlertMessageModule,
        PopUpMessageModule,
        NgbModule,
        KeyboardShortcutsModule,
        DiamondRoutingModule
    ],
    // declare the routed components that are defined in the routing module for this feature
    declarations: [ diamondRoutedComponents ]
})
export class DiamondModule {

}