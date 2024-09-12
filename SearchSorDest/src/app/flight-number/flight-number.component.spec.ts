import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightNumberComponent } from './flight-number.component';

describe('FlightNumberComponent', () => {
  let component: FlightNumberComponent;
  let fixture: ComponentFixture<FlightNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
