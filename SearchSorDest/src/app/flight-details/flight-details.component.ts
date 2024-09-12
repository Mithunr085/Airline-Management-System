import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight/flight.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flight: Flight = {
    flightId: 0,
    flightNumber: '',
    source: '',
    destination: '',
    arrivalTime: '',
    departureTime: '',
    availableSeats: 0,
    price: 0
  };

  errorMessage: string = '';

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    // Fetch the selected flight from the service
    const selectedFlight = this.flightService.getSelectedFlight();
    if (selectedFlight) {
      this.flight = selectedFlight;  // Populate the form with the selected flight
    } else {
      this.errorMessage = 'No flight selected';
    }
  }

  onSubmit() {
    console.log('Flight updated:', this.flight);
    if (this.flight.flightNumber) {
      this.flightService.updateFlight(this.flight).subscribe(
        (response) => {
          console.log('Flight updated successfully:', this.flight);
          alert('Flight updated successfully:')
          this.router.navigate(['/view-flights']); // Redirect to flight list after update
        },
        error => {
          this.errorMessage = 'Failed to update the flight';
        }
      );
    }
  }

  onDelete() {
    console.log('Flight deleted:', this.flight?.flightNumber);
    if (this.flight?.flightNumber) {
      this.flightService.deleteFlight(this.flight.flightNumber).subscribe(
        (response: string) => {
          console.log('Flight deleted successfully:', this.flight.flightNumber);
          alert(response); // Show the plain text response from the server
          this.router.navigate(['/view-flights']); // Redirect to flight list after deletion
        },
        error => {
          this.errorMessage = 'Failed to delete the flight';
          console.error('Error deleting flight:', error); // Log the error
        }
      );
    }
  }



}
