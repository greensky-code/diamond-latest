/* Copyright (c) 2021 . All Rights Reserved. */

/**
 * The application's root module.  
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppRoutingModule, appRoutableComponents } from './app-routing.module';
import { CoreModule } from "./core/index";
import { NumberFormatPipe } from "./shared/pipes/number.format.pipe";
import { AlertMessageModule } from "./shared/components/alert-message/alert.message.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';


// The BrowserModule is required to run as a web application
// The HttpModule is used to make web service calls
//
// The AppRouting Module needs to be listed last because 
// it includes a wildcard route (i.e. a catch all) route definition.
//
// The bootstrap property specifies what component to use as the starting point for the application
@NgModule({
    imports: [
    
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CoreModule,
        AlertMessageModule,
        AngularMyDatePickerModule,
        NgbModule,
        KeyboardShortcutsModule.forRoot()
    ],
    declarations: [ AppComponent, appRoutableComponents, NumberFormatPipe ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}