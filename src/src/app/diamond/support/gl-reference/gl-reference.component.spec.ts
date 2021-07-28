import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlReferenceComponent } from './gl-reference.component';

describe('GlReferenceComponent', () => {
  let component: GlReferenceComponent;
  let fixture: ComponentFixture<GlReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
