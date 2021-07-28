import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatabaseUserComponent } from './add-database-user.component';

describe('AddDatabaseUserComponent', () => {
  let component: AddDatabaseUserComponent;
  let fixture: ComponentFixture<AddDatabaseUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDatabaseUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDatabaseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
