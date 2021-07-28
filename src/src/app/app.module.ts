/* Copyright (c) 2020 . All Rights Reserved. */

/**
 * The application's root module.
 */
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {AppComponent} from './app.component';
import {appRoutableComponents, AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpIntercepterService} from './shared/services/http/http-intercepter.service';
import {SharedModule} from './shared/shared.module';
import {KeyboardShortcutsModule} from "ng-keyboard-shortcuts";
import {CoreModule} from "./core";
import {NgbToastModule} from "ngb-toast";
import localeFr from '@angular/common/locales/es-US';
import { DatePipe, registerLocaleData } from '@angular/common';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
registerLocaleData(localeFr);

// The BrowserAnimationsModule is required to run as a web application
// The HttpModule is used to make web service calls
//
// The AppRouting Module needs to be listed last because 
// it includes a wildcard route (i.e. a catch all) route definition.
//
// The bootstrap property specifies what component to use as the starting point for the application
@NgModule({
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        KeyboardShortcutsModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        HttpClientModule,
        NgbToastModule,
        SharedModule    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent, appRoutableComponents],
    providers: [DatePipe, {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi: true}, {provide: LOCALE_ID, useValue: "en-US"},
],
    bootstrap: [AppComponent]
})
export class AppModule {

}
