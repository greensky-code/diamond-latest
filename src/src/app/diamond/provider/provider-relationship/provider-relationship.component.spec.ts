import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRelationshipComponent } from './provider-relationship.component';

describe('ProviderRelationshipComponent', () => {
  let component: ProviderRelationshipComponent;
  let fixture: ComponentFixture<ProviderRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
