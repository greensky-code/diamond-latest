import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUserDefinedFieldsComponent } from './dynamic-user-defined-fields.component';

describe('DynamicUserDefinedFieldsComponent', () => {
  let component: DynamicUserDefinedFieldsComponent;
  let fixture: ComponentFixture<DynamicUserDefinedFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicUserDefinedFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUserDefinedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
