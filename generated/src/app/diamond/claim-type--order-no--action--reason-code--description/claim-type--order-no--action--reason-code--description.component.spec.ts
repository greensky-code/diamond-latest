/* Copyright (c) 2021 . All Rights Reserved. */

import { ClaimTypeOrderNoActionReasonCodeDescriptionComponent } from './claim-type--order-no--action--reason-code--description.component';
import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberValidators } from '../../shared/number.validator';
import { NumberFormatPipe } from '../../shared/number.format.pipe';
import { ReportService } from '../../core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, tick } from '@angular/core/testing';
import { click, newEvent, RouterStub,  ActivatedRoute, ActivatedRouteStub } from '../../../../testing/index';

describe('ClaimTypeOrderNoActionReasonCodeDescriptionComponent', () => {
    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });
    describe('with ClaimTypeOrderNoActionReasonCodeDescriptionComponent setup', ClaimTypeOrderNoActionReasonCodeDescriptionComponentSetup);
    describe('with FormsModule setup', formsModuleSetup);
});


let activatedRoute: ActivatedRouteStub;
let de: DebugElement;
let comp: ClaimTypeOrderNoActionReasonCodeDescriptionComponent;
let fixture: ComponentFixture<ClaimTypeOrderNoActionReasonCodeDescriptionComponent>;
let page: Page;

function createComponent() {
    fixture = TestBed.createComponent(ClaimTypeOrderNoActionReasonCodeDescriptionComponent);
    comp    = fixture.componentInstance;
    page    = new Page();

    fixture.detectChanges();
    return fixture.whenStable().subscribe(() => {
        fixture.detectChanges();
        page.addPageElements();
  });
}

class Page {
   /*
    Declare Debug Element here.

    searchButton:      DebugElement;
    previousButton:    DebugElement;
   */

  constructor() {
      const router = TestBed.get(Router); // get router from root injector
  }

  addPageElements() {
      /*
      Assign Html Debug Element Here.
      const buttons    = fixture.debugElement.queryAll(By.css('button'));
      this.searchButton     = buttons[0]
      this.previousButton   = buttons[1];
      this.nextButton   = buttons[2];

      const inputs    = fixture.debugElement.queryAll(By.css('input'));
      this.typeInput     = inputs[0].nativeElement;
      this.identInput     = inputs[1].nativeElement;
      */
  }
}

function ClaimTypeOrderNoActionReasonCodeDescriptionComponentSetup() {
    describe('ClaimTypeOrderNoActionReasonCodeDescriptionComponent', function () {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule, FormsModule, ReactiveFormsModule ],
                providers: [
                    AlertMessageService,
                    ReportService,
                    NumberValidators,
                    NumberFormatPipe,
                    { provide: Router,         useClass: RouterStub},
                    { provide: ActivatedRoute, useValue: activatedRoute },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                declarations: [ClaimTypeOrderNoActionReasonCodeDescriptionComponent]
             })
             .compileComponents()
             .subscribe(createComponent);
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClaimTypeOrderNoActionReasonCodeDescriptionComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('div'));
        });

        it('should create component', () => expect(comp).toBeDefined() );

    });
}

function formsModuleSetup() {
    class AlertMessageServiceSpy {
        warning = jasmine.createSpy('warning');
        info = jasmine.createSpy('info');
    }

    class RouterSpy {
        navigate = jasmine.createSpy('navigate');
    }

    let alertMessageServiceSpy: AlertMessageServiceSpy;
    let routerSpy: RouterSpy

    describe('ClaimTypeOrderNoActionReasonCodeDescriptionComponent', function () {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ HttpClientModule, ReactiveFormsModule ],
                providers: [
                    AlertMessageService,
                    ReportService,
                    NumberValidators,
                    NumberFormatPipe,
                    { provide: Router, useClass: RouterSpy },
                    { provide: ActivatedRoute, useValue: activatedRoute },
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                declarations: [ ClaimTypeOrderNoActionReasonCodeDescriptionComponent ]
            })
            .overrideComponent(ClaimTypeOrderNoActionReasonCodeDescriptionComponent, {
                set: {
                    providers: [
                      { provide: AlertMessageService, useClass: AlertMessageServiceSpy },
                    ]
                }
            })
            .compileComponents()
            .subscribe(createComponent);
        }));
    });
}