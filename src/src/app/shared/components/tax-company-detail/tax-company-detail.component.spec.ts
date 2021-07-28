import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCompanyDetailComponent } from './tax-company-detail.component';

describe('TaxCompanyDetailComponent', () => {
  let component: TaxCompanyDetailComponent;
  let fixture: ComponentFixture<TaxCompanyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxCompanyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
