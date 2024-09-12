import { Flight } from '../flight/flight.module';
import { Passenger } from '../passenger/passenger.module';

export class Booking {
  bookingId: number = 0;
  bookingTime: string = '';
  price: number = 0;
  status: string = '';
  paymentStatus: string = ''
  flight: Flight | null = null;  // Set to Flight or null
  passenger: Passenger | null = null;  // Set to Passenger or null
  flightNum: string = '';
  source: string = '';
  destination: string = '';
  arrivalTime: string = '';
  departureTime: string = '';
  passengerName: string = '';  // Include this if you need it
}
