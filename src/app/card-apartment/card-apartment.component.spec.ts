import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardApartmentComponent } from './card-apartment.component';

describe('CardApartmentComponent', () => {
  let component: CardApartmentComponent;
  let fixture: ComponentFixture<CardApartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardApartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
