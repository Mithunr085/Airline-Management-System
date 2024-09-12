package com.example.airlinemanagementsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.airlinemanagementsystem.entity.BookingTicket;
import com.example.airlinemanagementsystem.entity.Flight;
import com.example.airlinemanagementsystem.entity.Passenger;
import com.example.airlinemanagementsystem.entity.TransactionDetails;
import com.example.airlinemanagementsystem.exceptionhandling.BookingTicketNotFoundException;
import com.example.airlinemanagementsystem.repository.BookingTicketRepository;
import com.example.airlinemanagementsystem.service.BookingTicketService;
import com.example.airlinemanagementsystem.service.FlightService;

import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tkt")
public class BookingTicketController {

    @Autowired
    private BookingTicketService bookingTicketService;
    
    @Autowired
    private BookingTicketRepository br;

    @Autowired
    private FlightService fs;
    
    public BookingTicketController(BookingTicketService bookingTicketService) {
        super();
        this.bookingTicketService = bookingTicketService;
    }

    @PostMapping("/bookings")
    public ResponseEntity<BookingTicket> addBooking(@Valid @RequestBody BookingTicket bookingTicket) {
        try {
            // Log incoming request
            System.out.println("Received booking request: " + bookingTicket);

            // Get the flight associated with the booking
            Flight flight = fs.findById(bookingTicket.getFlight().getFlightId());
                             
            if (flight == null) {
                throw new RuntimeException("Flight not found");
            }
            // Check if there are enough available seats
            if (flight.getAvailableSeats() <= 0) {
                throw new RuntimeException("No seats available for the selected flight");
            }

            // Reduce available seats
            flight.setAvailableSeats(flight.getAvailableSeats() - 1);
            fs.save(flight); // Save the updated flight with reduced seats

            // Save the booking
            BookingTicket createdBooking = bookingTicketService.save(bookingTicket);

            // Return success response
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (RuntimeException e) {
            // Log exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<BookingTicket> getBookingById(@PathVariable int bookingId) {
        try {
            BookingTicket bookingTicket = bookingTicketService.getBookingById(bookingId);
            return ResponseEntity.ok(bookingTicket);
        } catch (BookingTicketNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<String> deleteBookingById(@PathVariable int bookingId) {
        try {
            bookingTicketService.deleteBookingById(bookingId);
            return ResponseEntity.ok("Booked Ticket with Id " + bookingId + " is Deleted Successfully.");
        } catch (BookingTicketNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking Ticket not found.");
        }
    }

    @GetMapping("/flights/{flightId}")
    public ResponseEntity<List<BookingTicket>> getBookingsByFlightId(@PathVariable int flightId) {
        try {
            List<BookingTicket> tickets = bookingTicketService.findByFlight_FlightId(flightId);
            return ResponseEntity.ok(tickets);
        } catch (BookingTicketNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<BookingTicket>> getBookingsByUserId(@PathVariable int userId) {
        try {
            List<BookingTicket> tickets = bookingTicketService.findByUser_UserId(userId);
            return ResponseEntity.ok(tickets);
        } catch (BookingTicketNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/all")  // read
	public List<BookingTicket> findAll() {
		return br.findAll();
	}
    
    @PutMapping("/bookings/{bookingId}/status")
    public ResponseEntity<BookingTicket> updateBookingStatusToPaid(@PathVariable int bookingId) {
        try {
            // Fetch the booking
            BookingTicket bookingTicket = bookingTicketService.getBookingById(bookingId);
            
            // Update status to 'Paid'
            bookingTicket.setStatus("Paid");
            BookingTicket updatedBooking = bookingTicketService.save(bookingTicket);

            return ResponseEntity.ok(updatedBooking);
        } catch (BookingTicketNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/createTransaction/{amount}")
    public ResponseEntity<TransactionDetails> createTransaction(@PathVariable("amount") Double amount) {
        TransactionDetails transactionDetails = bookingTicketService.createTransaction(amount);
        return new ResponseEntity<>(transactionDetails, HttpStatus.OK);
    }
}
