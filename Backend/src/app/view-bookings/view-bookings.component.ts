import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service';
import { Booking } from '../booking/booking.module';
import { Flight } from '../flight/flight.module';
import { Passenger } from '../passenger/passenger.module';
import { forkJoin, map, of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  flightNum: string = '';
  errorMessage: string = '';
  flight: Flight | null = null;

  constructor(private airlineService: AirlineService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(): void {
    this.airlineService.getAllBookings().subscribe(
      (data: Booking[]) => {
        this.bookings = data;
        this.populateFlightAndPassengerDetails();
      },
      error => {
        this.errorMessage = 'Error fetching booking data';
      }
    );
  }

  populateFlightAndPassengerDetails(): void {
    const flightRequests = this.bookings.map(booking =>
      booking.flight ? this.airlineService.getFlightById(booking.flight.flightId).pipe(
        map((flight: Flight) => ({ booking, flight }))
      ) : of({ booking, flight: null })
    );

    const passengerRequests = this.bookings.map(booking =>
      booking.passenger ? this.airlineService.getPassengerById(booking.passenger.passengerId).pipe(
        map((passenger: Passenger) => ({ booking, passenger }))
      ) : of({ booking, passenger: null })
    );

    forkJoin({
      flights: forkJoin(flightRequests),
      passengers: forkJoin(passengerRequests)
    }).subscribe({
      next: ({ flights, passengers }) => {
        const flightMap = new Map<number, Flight>();
        flights.forEach(({ booking, flight }) => {
          if (flight) {
            flightMap.set(booking.flight!.flightId, flight);
          }
        });

        const passengerMap = new Map<number, Passenger>();
        passengers.forEach(({ booking, passenger }) => {
          if (passenger) {
            passengerMap.set(booking.passenger!.passengerId, passenger);
          }
        });

        this.bookings.forEach(booking => {
          if (booking.flight) {
            const flight = flightMap.get(booking.flight.flightId);
            if (flight) {
              booking.flightNum = flight.flightNumber;
              booking.source = flight.source;
              booking.destination = flight.destination;
              booking.arrivalTime = flight.arrivalTime;
              booking.departureTime = flight.departureTime;
              booking.price = flight.price;
            }
          }

          if (booking.passenger) {
            const passenger = passengerMap.get(booking.passenger.passengerId);
            if (passenger) {
              booking.passengerName = passenger.name;
            }
          }
        });

        this.cdr.detectChanges();
      },
      error: error => {
        this.errorMessage = 'Error fetching flight or passenger data';
      }
    });
  }

  // Search a flight by flight number
  searchFlight(): void {
    if (this.flightNum.trim()) {
      this.airlineService.getFlightDetails(this.flightNum).subscribe(
        (response: Flight | Flight[]) => {
          let flight: Flight | null = null;

          // If the response is an array, take the first element
          if (Array.isArray(response)) {
            flight = response.length > 0 ? response[0] : null;
          } else {
            flight = response;
          }

          console.log('Fetched flight:', flight); // Log fetched flight details

          if (flight) {
            this.flight = flight;
            this.filterBookingsByFlight(flight.flightId); // Ensure flightId is a number
          } else {
            this.errorMessage = `No flights found for flight number ${this.flightNum}`;
            this.bookings = []; // Clear bookings if no flight is found
          }
        },
        error => {
          this.errorMessage = `Error fetching flight details for flight number ${this.flightNum}`;
        }
      );
    } else {
      this.errorMessage = 'Please enter a flight number';
      this.bookings = []; // Clear bookings if flight number is empty
    }
  }




  filterBookingsByFlight(flightId: number): void {
    this.airlineService.getAllBookings().subscribe(
      (allBookings: Booking[]) => {
        console.log('All bookings:', allBookings); // Log all bookings

        // Log the flightId you are filtering by
        console.log('Filtering by flightId:', flightId);

        // Filter bookings by flightId within the flight property
        this.bookings = allBookings.filter(booking => {
          if (booking.flight) {
            // Log the booking's flightId
            const bookingFlightId = booking.flight.flightId;
            console.log('Booking flightId:', bookingFlightId); // Check what flightId each booking has

            // Check type consistency and filtering logic
            const isMatch = bookingFlightId === flightId;
            console.log(`Booking ${booking.bookingId} matches: ${isMatch}`); // Log whether it matches

            return isMatch;
          }
          return false; // Return false if the booking doesn't have a flight
        });

        console.log('Filtered bookings:', this.bookings); // Log filtered bookings

        // Update error message if no bookings found
        this.errorMessage = this.bookings.length === 0
          ? `No bookings found for flight number ${this.flightNum}`
          : '';
      },
      error => {
        this.errorMessage = 'Error fetching booking data';
      }
    );
  }




}
