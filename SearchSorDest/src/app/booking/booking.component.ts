import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineService } from '../airline.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'; // Import AuthServiceService
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  flights: any[] = [];
  source: string = '';
  destination: string = '';
  errorMessage: string = '';
  passengerId: number | null = null;
  flightId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private airlineService: AirlineService,
    private cdr: ChangeDetectorRef,
    private authService: AuthServiceService, // Inject AuthServiceService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(5)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      flightNumber: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      departureTime: ['', Validators.required],
      price: [{ value: '', disabled: true }, Validators.required],
      availSeats: [{ value: '', disabled: true }, Validators.required]
    });
  }

  searchFlights(): void {
    if (this.source && this.destination) {
      if (this.source.toLowerCase() === this.destination.toLowerCase()) {
        alert('Source and destination cannot be the same.');
        return; // Exit the method without making the API call
      }
      this.airlineService.getFlightsBySourceDestination(this.source, this.destination).subscribe(
        (response: any) => {
          this.flights = response;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'No flights found for the selected route.';
          this.flights = [];
        }
      );
    } else {
      this.errorMessage = 'Please enter both source and destination.';
    }
  }

  selectFlight(flight: any): void {
    console.log('Selected flight:', flight);
    this.flightId = flight.flightId;

    this.airlineService.getFlightDetails(flight.flightNumber).subscribe(
      (response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          const flightDetails = response[0];

          this.bookingForm.patchValue({
            flightNumber: flightDetails.flightNumber,
            source: flightDetails.source,
            destination: flightDetails.destination,
            arrivalTime: flightDetails.arrivalTime,
            departureTime: flightDetails.departureTime,
            price: flightDetails.price,
            availSeats: flightDetails.availableSeats
          });

          this.cdr.detectChanges();
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No flight details found.';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching flight details.';
        console.error('Flight details fetch error:', error);
      }
    );
  }

  savePassengerDetails(): void {
    if (this.bookingForm.get('name')?.value && this.bookingForm.get('gender')?.value &&
      this.bookingForm.get('age')?.value && this.bookingForm.get('phone')?.value) {
      const passengerData = {
        name: this.bookingForm.get('name')?.value,
        gender: this.bookingForm.get('gender')?.value,
        age: this.bookingForm.get('age')?.value,
        phoneNumber: this.bookingForm.get('phone')?.value
      };

      this.airlineService.addPassenger(passengerData).subscribe(
        (response: any) => {
          if (response.passengerId) {
            this.passengerId = response.passengerId;
            alert('Passenger details saved successfully.');
          } else {
            this.errorMessage = 'Failed to save passenger details.';
          }
        },
        (error) => {
          console.error('Failed to save passenger details:', error);
          this.errorMessage = 'Error saving passenger details.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all passenger details before saving.';
    }
  }

  onSubmit(): void {
    const userId = this.authService.getUserAuthorization(); // Get userId from AuthServiceService

    if (this.bookingForm.valid && this.passengerId && this.flightId && userId) {
      const bookingData = {
        bookingTime: new Date().toISOString(),
        price: this.bookingForm.get('price')?.value,
        status: 'Confirmed',
        flight: { flightId: this.flightId },
        passenger: {
          passengerId: this.passengerId,
          name: this.bookingForm.get('name')?.value,
          gender: this.bookingForm.get('gender')?.value,
          age: this.bookingForm.get('age')?.value,
          phoneNumber: this.bookingForm.get('phone')?.value
        },
        user: {
          userId: userId // Include userId in the booking payload
        }
      };

      this.airlineService.insertBooking(bookingData).subscribe(
        (response) => {
          alert('Booking successful!');
          this.resetForm();
          this.router.navigate(['/payment']);
        },
        (error) => {
          console.error('Booking failed:', error);
          this.errorMessage = 'Booking failed. Please try again.';
        }
      );
    } else if (!this.passengerId) {
      this.errorMessage = 'Please save passenger details before booking.';
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  resetForm(): void {
    this.bookingForm.reset();
    this.flights = [];
    this.source = '';
    this.destination = '';
    this.passengerId = null;
    this.flightId = null;
  }
}
