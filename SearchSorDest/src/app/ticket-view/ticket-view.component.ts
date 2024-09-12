import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../airline.service'; // Service to handle airline operations
import { AuthServiceService } from '../auth-service.service'; // Auth service to manage user session
import { jsPDF } from 'jspdf'; // Library to generate PDFs

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  tickets: any[] = []; // Array to hold user tickets

  constructor(private airlineService: AirlineService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    // Load tickets for the logged-in user when the component is initialized
    this.loadUserTickets();
  }

  loadUserTickets(): void {
    const userId = this.authService.getUserAuthorization(); // Get userId from auth service
    this.airlineService.getBookingsByUserId(userId).subscribe(
      (response: any) => {
        this.tickets = response;
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  // Check if the ticket is paid (Confirmed status is considered as Paid)
  canDownload(ticket: any): boolean {
    return ticket.status === 'Delivered';
  }

  // Generate PDF ticket
  generatePDF(ticket: any): void {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 10;

    // Add title
    doc.setFontSize(22);
    doc.text('Ticket Details', margin, margin + lineHeight);

    // Set font size for details
    doc.setFontSize(16);

    // Add ticket details
    doc.text(`Flight Number: ${ticket.flight.flightNumber}`, margin, margin + 3 * lineHeight);
    doc.text(`Passenger Name: ${ticket.passenger.name}`, margin, margin + 4 * lineHeight);
    doc.text(`Departure Time: ${ticket.flight.departureTime}`, margin, margin + 5 * lineHeight);
    doc.text(`Arrival Time: ${ticket.flight.arrivalTime}`, margin, margin + 6 * lineHeight);
    doc.text(`Source: ${ticket.flight.source}`, margin, margin + 7 * lineHeight);
    doc.text(`Destination: ${ticket.flight.destination}`, margin, margin + 8 * lineHeight);
    doc.text(`Price: ${ticket.price}`, margin, margin + 9 * lineHeight);
    doc.text(`Status: ${ticket.status}`, margin, margin + 10 * lineHeight);

    // Save the PDF with a file name
    doc.save(`ticket-${ticket.bookingId}.pdf`);
  }
}
