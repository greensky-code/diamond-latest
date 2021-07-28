/* Copyright (c) 2021 . All Rights Reserved. */

import { ArCashReceiptsComponent } from './ar-cash-receipts.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRouteStub, RouterStub } from '../../../../../testing';
import { AlertMessageService } from '../../../shared/components/alert-message';
import { ReportService } from '../../../core';
import { NumberValidators } from '../../../shared/number.validator';
import { NumberFormatPipe } from '../../../shared/pipes/number.format.pipe';

describe('ArCashReceiptsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });
  describe('with ArCashReceiptsComponent setup', ArCashReceiptsComponentSetup);
  describe('with FormsModule setup', formsModuleSetup);
});


let activatedRoute: ActivatedRouteStub;
let de: DebugElement;
let comp: ArCashReceiptsComponent;
let fixture: ComponentFixture<ArCashReceiptsComponent>;
let page: Page;

function createComponent() {
  fixture = TestBed.createComponent(ArCashReceiptsComponent);
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

function ArCashReceiptsComponentSetup() {
  describe('ArCashReceiptsComponent', function () {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
        providers: [
          AlertMessageService,
          ReportService,
          NumberValidators,
          NumberFormatPipe,
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useValue: activatedRoute },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        declarations: [ArCashReceiptsComponent]
      })
        .compileComponents()
        .subscribe(createComponent);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ArCashReceiptsComponent);
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

  describe('ArCashReceiptsComponent', function () {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule, ReactiveFormsModule],
        providers: [
          AlertMessageService,
          ReportService,
          NumberValidators,
          NumberFormatPipe,
          { provide: Router, useClass: RouterSpy },
          { provide: ActivatedRoute, useValue: activatedRoute },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        declarations: [ArCashReceiptsComponent]
      })
        .overrideComponent(ArCashReceiptsComponent, {
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