import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUserDefinedFieldsComponent } from './member-user-defined-fields.component';

describe('MemberUserDefinedFieldsComponent', () => {
  let component: MemberUserDefinedFieldsComponent;
  let fixture: ComponentFixture<MemberUserDefinedFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberUserDefinedFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberUserDefinedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
