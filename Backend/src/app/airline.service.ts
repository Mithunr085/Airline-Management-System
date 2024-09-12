// airline.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Flight } from '../app/flight/flight.module'; // Adjust the path as necessary
import { Booking } from './booking/booking.module';
import { Passenger } from './passenger/passenger.module';
import { User } from './user/user.module';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  private baseUrl = 'http://localhost:8080/api/fly/flights'; // Backend API base URL
  private apiUrl = 'http://localhost:8080/api/pass';
  private passUrl = 'http://localhost:8080/api/tkt';
  private payUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getFlightsBySourceDestination(source: string, destination: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/${source}/${destination}`);
  }

  getFlightDetails(flightNumber: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.baseUrl}/flightNum/${flightNumber}`);
  }

  addPassenger(passengerDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/passengers`, passengerDetails);
  }

  addFlight(flightDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, flightDetails);
  }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/all`); // Updated to use /all endpoint
  }
  // error so
  insertBooking(bookingData: any) {
    // Assuming the backend API URL is /api/bookings
    return this.http.post(`${this.passUrl}/bookings`, bookingData);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.passUrl}/all`);
  }

  getFlightById(flightId: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.baseUrl}/${flightId}`);
  }

  getPassengerById(passengerId: number): Observable<any> {
    return this.http.get<Passenger>(`${this.apiUrl}/passengers/${passengerId}`);
  }

  getBookingsByUserId(userId: number): Observable<any> {
    return this.http.get<User[]>(`${this.passUrl}/users/${userId}`);
  }

  addPaymentOfOrder(amount: any): Observable<any> {
    return this.http.get(this.passUrl + "/createTransaction/" + amount);
  }

  addPayment(body: any, bookingid: any, uid: any): Observable<any> {
    return this.http.post(this.payUrl + "/payments/" + bookingid + "/" + uid, body);
  }



  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.passUrl}/bookings/${bookingId}`);
  }

  // Update booking status to 'Paid'
  updateBookingStatusToPaid(bookingId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/bookings/${bookingId}/status`, { status: 'Paid' });
  }

}
