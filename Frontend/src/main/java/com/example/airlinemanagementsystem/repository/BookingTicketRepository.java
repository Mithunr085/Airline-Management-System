package com.example.airlinemanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.airlinemanagementsystem.entity.BookingTicket;

public interface BookingTicketRepository extends JpaRepository<BookingTicket, Integer>{

	 List<BookingTicket> findByFlight_FlightId(int flightId);
	 
	// To find all bookings for a specific user
	    List<BookingTicket> findByUser_UserId(int userId);
	   // List<BookingTicket> findAll();
}
