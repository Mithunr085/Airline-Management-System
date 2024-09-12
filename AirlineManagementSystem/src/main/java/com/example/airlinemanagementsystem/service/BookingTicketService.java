package com.example.airlinemanagementsystem.service;

import java.util.List;
import com.example.airlinemanagementsystem.entity.BookingTicket;
import com.example.airlinemanagementsystem.entity.TransactionDetails;
import com.example.airlinemanagementsystem.exceptionhandling.BookingTicketNotFoundException;


public interface BookingTicketService {
    
    BookingTicket save(BookingTicket bookingTicket);
    
    void deleteBookingById(int bookingId) throws BookingTicketNotFoundException;
    
    BookingTicket getBookingById(int bookingId) throws BookingTicketNotFoundException;

    List<BookingTicket> findByFlight_FlightId(int flightId) throws BookingTicketNotFoundException;
    
 // New method to find bookings by user ID
    List<BookingTicket> findByUser_UserId(int userId) throws BookingTicketNotFoundException;
    TransactionDetails createTransaction(Double amount);

}
