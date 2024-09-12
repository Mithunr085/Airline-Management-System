import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineService } from '../airline.service';

@Component({
  selector: 'app-add-flight-component',
  templateUrl: './add-flight-component.component.html',
  styleUrls: ['./add-flight-component.component.css']
})


export class AddFlightComponentComponent {

  flightForm!: FormGroup;

  constructor(private fb: FormBuilder, private airlineService: AirlineService) {
    this.flightForm = this.fb.group({
      flightNumber: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      departureTime: ['', Validators.required],
      availableSeats: [null, [Validators.required, Validators.min(1)]],  // Remove default value
      price: [null, [Validators.required, Validators.min(0)]]  // Remove default value
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      const flightDetails = this.flightForm.value;
      console.log('Flight form value:', flightDetails); // Debug form values
      this.airlineService.addFlight(flightDetails).subscribe(
        response => {
          console.log('Flight added successfully', response);
          alert('Flight added successfully');
          this.flightForm.reset();
        },
        error => {
          console.error('Error adding flight', error);
          alert(`Error adding flight: ${error.error || 'Unknown error'}`);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
