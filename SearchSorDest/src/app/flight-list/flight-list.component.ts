import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight/flight.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights: Flight[] = [];
  source: string = '';
  destination: string = '';
  errorMessage: string = '';

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFlights();
  }

  getAllFlights(): void {
    // Assuming you're fetching flights from some API
    this.flightService.getAllFlights().subscribe(
      data => {
        this.flights = data;
      },
      error => {
        this.errorMessage = 'Error fetching flight data';
      }
    );
  }

  searchFlights(): void {
    if (this.source && this.destination) {
      if (this.source.toLowerCase() === this.destination.toLowerCase()) {
        alert('Source and destination cannot be the same.');
        return; // Exit the method without making the API call
      }
      this.flightService.getFlightsBySourceDestination(this.source, this.destination).subscribe(
        data => {
          this.flights = data;
        },
        error => {
          this.errorMessage = `Error fetching flights from ${this.source} to ${this.destination}`;
        }
      );
    } else {
      this.errorMessage = 'Please provide both source and destination';
    }
  }

  editFlight(flight: Flight): void {
    this.flightService.setSelectedFlight(flight);  // Set the selected flight in the service
    this.router.navigate(['/update-flight']);       // Navigate to the flight details page
  }
}
