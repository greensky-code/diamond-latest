/* Copyright (c) 2021 . All Rights Reserved. */

import {WindowsAccessComponent} from './windows-access.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {AlertMessageService} from '../../../shared/components/alert-message';
import {Router} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NumberValidators} from '../../../shared/number.validator';
import {NumberFormatPipe} from '../../../shared/pipes/number.format.pipe';
import {ReportService} from '../../../core';
import {ActivatedRoute, ActivatedRouteStub, RouterStub} from '../../../../../testing/index';

describe('WindowsAccessComponent', () => {
    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });
    describe('with WindowsAccessComponent setup', WindowsAccessComponentSetup);
    describe('with FormsModule setup', formsModuleSetup);
});


let activatedRoute: ActivatedRouteStub;
let de: DebugElement;
let comp: WindowsAccessComponent;
let fixture: ComponentFixture<WindowsAccessComponent>;
let page: Page;

function createComponent() {
    fixture = TestBed.createComponent(WindowsAccessComponent);
    comp = fixture.componentInstance;
    page = new Page();

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

function WindowsAccessComponentSetup() {
    describe('WindowsAccessComponent', function () {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
                providers: [
                    AlertMessageService,
                    ReportService,
                    NumberValidators,
                    NumberFormatPipe,
                    {provide: Router, useClass: RouterStub},
                    {provide: ActivatedRoute, useValue: activatedRoute},
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                declarations: [WindowsAccessComponent]
            })
                .compileComponents()
                .subscribe(createComponent);
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WindowsAccessComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('div'));
        });

        it('should create component', () => expect(comp).toBeDefined());

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

    describe('WindowsAccessComponent', function () {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule, ReactiveFormsModule],
                providers: [
                    AlertMessageService,
                    ReportService,
                    NumberValidators,
                    NumberFormatPipe,
                    {provide: Router, useClass: RouterSpy},
                    {provide: ActivatedRoute, useValue: activatedRoute},
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                declarations: [WindowsAccessComponent]
            })
                .overrideComponent(WindowsAccessComponent, {
                    set: {
                        providers: [
                            {provide: AlertMessageService, useClass: AlertMessageServiceSpy},
                        ]
                    }
                })
                .compileComponents()
                .subscribe(createComponent);
        }));
    });
}
