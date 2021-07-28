import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEmailComponent } from './address-email.component';

describe('AddressEmailComponent', () => {
  let component: AddressEmailComponent;
  let fixture: ComponentFixture<AddressEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
