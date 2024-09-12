import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AirlineService } from '../airline.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {
  source: string = '';
  destination: string = '';
  flights: any[] = [];
  errorMessage: string = '';

  constructor(private airlineService: AirlineService) { }

  searchFlights() {
    if (this.source && this.destination) {
      if (this.source.toLowerCase() === this.destination.toLowerCase()) {
        alert('Source and destination cannot be the same.');
        return; // Exit the method without making the API call
      }

      this.airlineService.getFlightsBySourceDestination(this.source, this.destination)
        .subscribe(
          (data) => {
            this.flights = data;
            if (this.flights.length === 0) {
              this.errorMessage = 'No flights available for the selected route.';
            } else {
              this.errorMessage = '';
            }
          },
          (error) => {
            this.errorMessage = 'An error occurred while fetching flight data.';
            console.error(error);
          }
        );
    } else {
      this.errorMessage = 'Please enter both source and destination';
      this.flights = [];
    }
  }

}
