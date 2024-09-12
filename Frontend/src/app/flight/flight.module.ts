// flight.model.ts
export interface Flight {
  flightId: number;
  flightNumber: string;
  source: string;
  destination: string;
  arrivalTime: string;
  departureTime: string;
  availableSeats: number;
  price: number;
}
