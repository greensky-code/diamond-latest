import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub } from '../../../../../testing';
import { ReportService } from '../../../core';
import { AlertMessageService } from '../../../shared/components/alert-message';
import { NumberFormatPipe } from '../../../shared/pipes/number.format.pipe';
import { NumberValidators } from '../../../shared/validators/number.validator';

import { BenefitWeightAccumulatorComponent } from './benefit-weight-accumulator.component';

describe('BenefitWeightAccumulatorComponent', () => {
  let component: BenefitWeightAccumulatorComponent;
  let fixture: ComponentFixture<BenefitWeightAccumulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BenefitWeightAccumulatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitWeightAccumulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

let activatedRoute: ActivatedRouteStub;
let de: DebugElement;
let comp: BenefitWeightAccumulatorComponent;
let fixture: ComponentFixture<BenefitWeightAccumulatorComponent>;
let page: Page;

function createComponent() {
  fixture = TestBed.createComponent(BenefitWeightAccumulatorComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
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

function BenefitWeightAccumulatorComponentSetup() {
  describe('BenefitWeightAccumulatorComponent', function () {
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
        declarations: [BenefitWeightAccumulatorComponent]
      })
        .compileComponents()
        .then(createComponent);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BenefitWeightAccumulatorComponent);
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

  describe('BenefitWeightAccumulatorComponent', function () {
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
        declarations: [BenefitWeightAccumulatorComponent]
      })
        .overrideComponent(BenefitWeightAccumulatorComponent, {
          set: {
            providers: [
              { provide: AlertMessageService, useClass: AlertMessageServiceSpy },
            ]
          }
        })
        .compileComponents()
        .then(createComponent);
    }));
  });
}