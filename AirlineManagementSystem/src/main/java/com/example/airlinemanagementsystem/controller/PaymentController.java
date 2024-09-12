package com.example.airlinemanagementsystem.controller;

import com.example.airlinemanagementsystem.entity.Payment;
import com.example.airlinemanagementsystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("{bookingId}/{userId}")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment, 
                                              @PathVariable int bookingId,
                                              @PathVariable int userId) {
        return new ResponseEntity<>(paymentService.addPayment(payment, bookingId, userId), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("{paymentId}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable("paymentId") long paymentId) {
        return new ResponseEntity<>(paymentService.getPaymentById(paymentId), HttpStatus.OK);
    }

    @DeleteMapping("{paymentId}")
    public ResponseEntity<Boolean> deletePayment(@PathVariable("paymentId") long paymentId) {
        paymentService.deletePayment(paymentId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}

