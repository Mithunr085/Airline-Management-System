import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlightComponentComponent } from './add-flight-component.component';

describe('AddFlightComponentComponent', () => {
  let component: AddFlightComponentComponent;
  let fixture: ComponentFixture<AddFlightComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFlightComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlightComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
