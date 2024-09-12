package com.example.airlinemanagementsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "booking_Ticket")
@SequenceGenerator(name = "generator2", sequenceName = "gen2", initialValue = 5000)
public class BookingTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator2")
    private int bookingId;

    //@NotBlank(message = "Booking Time is required")
    private String bookingTime;

    @NotNull(message = "Price is required")
    private double price;

   // @NotBlank(message = "Status is required")
    private String status;
    
    private String paymentStatus ="unpaid";

   // @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "flight_Id", nullable = false)
    private Flight flight;

   
    @OneToOne
    @JoinColumn(name = "passenger_Id")
    private Passenger passenger;
    
    
 // ManyToOne relationship with User
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public BookingTicket() {
        super();
    }
	
	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public BookingTicket(int bookingId, String bookingTime, @NotNull(message = "Price is required") double price,
			String status, String paymentStatus, Flight flight, Passenger passenger, User user) {
		super();
		this.bookingId = bookingId;
		this.bookingTime = bookingTime;
		this.price = price;
		this.status = status;
		this.paymentStatus = paymentStatus;
		this.flight = flight;
		this.passenger = passenger;
		this.user = user;
	}
	
	public int getBookingId() {
		return bookingId;
	}


	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

	public String getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(String bookingTime) {
		this.bookingTime = bookingTime;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

   
}
