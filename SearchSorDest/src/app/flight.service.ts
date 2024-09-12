import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from './flight/flight.module';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private baseUrl = 'http://localhost:8080/api/fly/flights'; // Backend API base URL
  private apiUrl = 'http://localhost:8080/api/pass';
  constructor(private http: HttpClient) { }
  private selectedFlight: Flight | null = null;
  setSelectedFlight(flight: Flight): void {
    this.selectedFlight = flight;
  }

  // Get the selected flight
  getSelectedFlight(): Flight | null {
    return this.selectedFlight;
  }
  getFlightsBySourceDestination(source: string, destination: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/${source}/${destination}`);
  }

  getFlightDetails(flightNumber: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.baseUrl}/${flightNumber}`);
  }

  addPassenger(passengerDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/passengers`, passengerDetails);
  }

  addFlight(flightDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, flightDetails);
  }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}`); // Updated to use /all endpoint
  }
  // error so
  insertBooking(bookingData: any) {
    // Assuming the backend API URL is /api/bookings
    return this.http.post('/api/bookings', bookingData);
  }
  updateFlight(flight: Flight): Observable<any> {
    return this.http.put(`${this.baseUrl}`, flight);
  }

  deleteFlight(flightNumber: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/flightNum/${flightNumber}`, { responseType: 'text' as 'json' });
  }
}
