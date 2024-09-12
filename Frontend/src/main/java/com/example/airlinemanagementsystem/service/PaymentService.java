package com.example.airlinemanagementsystem.service;

import java.util.List;

import com.example.airlinemanagementsystem.entity.Payment;


public interface PaymentService {

	    Payment addPayment(Payment payment, int orderId, int userId);

	    List<Payment> getAllPayments();

	    Payment getPaymentById(long paymentId);

	    void deletePayment(long paymentId);

	    List<Payment> getAllPaymentsByUserId(int userId);
}


