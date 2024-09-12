package com.example.airlinemanagementsystem.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.airlinemanagementsystem.entity.BookingTicket;
import com.example.airlinemanagementsystem.entity.Payment;
import com.example.airlinemanagementsystem.entity.User;
import com.example.airlinemanagementsystem.repository.BookingTicketRepository;
import com.example.airlinemanagementsystem.repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingTicketRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BookingTicketService orderService;

    public PaymentServiceImpl(PaymentRepository paymentRepository, UserService userService,
                              BookingTicketService orderService) {
        this.paymentRepository = paymentRepository;
        this.userService = userService;
        this.orderService = orderService;
    }

    @Override
    public Payment addPayment(Payment payment, int bookingId, int userId) {
        BookingTicket booking = orderRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found for ID: " + bookingId));

        System.out.println("**************** Booking ID: " + booking.getBookingId());

        // Set payment details
        payment.setBookingId(bookingId);
        payment.setTotalPrice(booking.getPrice());
        payment.setPaidDate(LocalDate.now());
        payment.setPaidAmount(booking.getPrice());

        // Update booking ticket based on payment status
        if (payment.getTotalPrice() == payment.getPaidAmount()) {
            booking.setPaymentStatus("PAID");
            booking.setStatus("Delivered");
        } else {
            booking.setPaymentStatus("NOT-PAID");
            booking.setStatus("Payment Pending");
        }

        // Get the user and associate with payment
        User user = userService.getUserById(userId);
        payment.setUser(user);

        // Save payment and return the result
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found for ID: " + paymentId));
    }

    @Override
    public void deletePayment(long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found for ID: " + paymentId));
        paymentRepository.deleteById(paymentId);
    }

    @Override
    public List<Payment> getAllPaymentsByUserId(int userId) {
        return paymentRepository.findByUserId(userId); // Ensure the repository method exists
    }
}
