import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionAccessComponent } from './function-access.component';

describe('FunctionAccessComponent', () => {
  let component: FunctionAccessComponent;
  let fixture: ComponentFixture<FunctionAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
