import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgusDetailComponent } from './argus-detail.component';

describe('ArgusDetailComponent', () => {
  let component: ArgusDetailComponent;
  let fixture: ComponentFixture<ArgusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgusDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
