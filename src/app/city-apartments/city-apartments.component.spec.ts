import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityApartmentsComponent } from './city-apartments.component';

describe('CityApartmentsComponent', () => {
  let component: CityApartmentsComponent;
  let fixture: ComponentFixture<CityApartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityApartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
