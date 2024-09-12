package com.example.airlinemanagementsystem.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.airlinemanagementsystem.entity.BookingTicket;
import com.example.airlinemanagementsystem.entity.Flight;
import com.example.airlinemanagementsystem.entity.Passenger;
import com.example.airlinemanagementsystem.entity.TransactionDetails;
import com.example.airlinemanagementsystem.entity.User;
import com.example.airlinemanagementsystem.exceptionhandling.BookingTicketNotFoundException;
import com.example.airlinemanagementsystem.exceptionhandling.UserNotFoundException;
import com.example.airlinemanagementsystem.repository.BookingTicketRepository;
import com.example.airlinemanagementsystem.repository.FlightRepository;
import com.example.airlinemanagementsystem.repository.PassengerRepository;
import com.example.airlinemanagementsystem.repository.UserRepository;
import com.razorpay.RazorpayClient;

import java.util.List;
import java.util.Optional;

@Service
public class BookingTicketServiceImpl implements BookingTicketService {

    private static final String KEY = "Generate-Your-Key";
    private static final String KEY_SECRET = "Generate-Your-SecretId";
    private static final String CURRENCY = "INR";

    @Autowired
    private BookingTicketRepository bookingTicketRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public BookingTicket save(BookingTicket bookingTicket) {
        // Validate and save passenger
        Passenger passenger = bookingTicket.getPassenger();
        if (passenger == null) {
            throw new RuntimeException("Passenger details are missing");
        }

        if (!isValidPassenger(passenger)) {
            throw new RuntimeException("Passenger details are invalid: " + getPassengerValidationErrors(passenger));
        }

        Passenger savedPassenger = passengerRepository.save(passenger);

        // Validate and save flight
        Flight flight = bookingTicket.getFlight();
        if (flight == null) {
            throw new RuntimeException("Flight details are missing");
        }

        Flight savedFlight = flightRepository.findById(flight.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        // Validate and save user
        User user = bookingTicket.getUser();
        if (user == null) {
            throw new RuntimeException("User details are missing");
        }

        User savedUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set the validated and saved entities back to the bookingTicket
        bookingTicket.setPassenger(savedPassenger);
        bookingTicket.setFlight(savedFlight);
        bookingTicket.setUser(savedUser);

        // Save booking ticket
        return bookingTicketRepository.save(bookingTicket);
    }

    private boolean isValidPassenger(Passenger passenger) {
        return passenger != null &&
                passenger.getName() != null && !passenger.getName().trim().isEmpty() &&
                passenger.getGender() != null && !passenger.getGender().trim().isEmpty() &&
                passenger.getAge() >= 5 &&
                passenger.getPhoneNumber() != null && passenger.getPhoneNumber().matches("\\d{10}");
    }

    private String getPassengerValidationErrors(Passenger passenger) {
        StringBuilder errors = new StringBuilder();
        if (passenger.getName() == null || passenger.getName().trim().isEmpty()) {
            errors.append("Passenger name is required. ");
        }
        if (passenger.getGender() == null || passenger.getGender().trim().isEmpty()) {
            errors.append("Passenger gender is required. ");
        }
        if (passenger.getAge() < 5) {
            errors.append("Passenger age must be 5 or above. ");
        }
        if (passenger.getPhoneNumber() == null || !passenger.getPhoneNumber().matches("\\d{10}")) {
            errors.append("Phone number must be 10 digits. ");
        }
        return errors.toString();
    }

    private boolean isValidFlight(Flight flight) {
        return flight != null && flight.getFlightId() > 0;
    }

    private boolean isValidUser(User user) {
        return user != null && user.getUserId() > 0;
    }

    @Override
    @Transactional
    public void deleteBookingById(int bookingId) throws BookingTicketNotFoundException {
        if (!bookingTicketRepository.existsById(bookingId)) {
            throw new BookingTicketNotFoundException("Booking not found");
        }
        bookingTicketRepository.deleteById(bookingId);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingTicket getBookingById(int bookingId) throws BookingTicketNotFoundException {
        return bookingTicketRepository.findById(bookingId)
                .orElseThrow(() -> new BookingTicketNotFoundException("Booking not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingTicket> findByFlight_FlightId(int flightId) throws BookingTicketNotFoundException {
        List<BookingTicket> tickets = bookingTicketRepository.findByFlight_FlightId(flightId);
        if (tickets.isEmpty()) {
            throw new BookingTicketNotFoundException("No bookings found for flight ID: " + flightId);
        }
        return tickets;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingTicket> findByUser_UserId(int userId) throws BookingTicketNotFoundException {
        List<BookingTicket> tickets = bookingTicketRepository.findByUser_UserId(userId);
        if (tickets.isEmpty()) {
            throw new BookingTicketNotFoundException("No bookings found for user ID: " + userId);
        }
        return tickets;
    }

    @Override
    public TransactionDetails createTransaction(Double amount) {
        try {

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("amount", (amount * 100));
            jsonObject.put("currency", CURRENCY);

            RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);

            com.razorpay.Order order = razorpayClient.orders.create(jsonObject);

            TransactionDetails transactionDetails = prepareTransactionDetails(order);
            return transactionDetails;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    private TransactionDetails prepareTransactionDetails(com.razorpay.Order order) {
        String orderId = order.get("id");
        String currency = order.get("currency");
        Integer amount = order.get("amount");

        TransactionDetails transactionDetails = new TransactionDetails(orderId, currency, amount, KEY);
        return transactionDetails;
    }
}
