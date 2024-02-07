package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Payment;
import com.example.demo.exception.PaymentNotFoundException;
import com.example.demo.service.PaymentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("{bookingId}/{participantId}")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment, @PathVariable long bookingId,
            @PathVariable long participantId) {
        System.out.println("Received a request to add payment for booking ID: " + bookingId + " and participant ID: " + participantId);

        Payment addedPayment = paymentService.addPayment(payment, bookingId, participantId);

        System.out.println("Payment added: " + addedPayment);
        return new ResponseEntity<>(addedPayment, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        System.out.println("Received a request to fetch all payments.");

        List<Payment> payments = paymentService.getAllPayments();
        System.out.println("Returning all payments: " + payments);

        return payments;
    }

    @DeleteMapping("/delete/{paymentId}")
    public ResponseEntity<Void> deletePayment(@PathVariable long paymentId) {
        System.out.println("Received a request to delete payment with ID: " + paymentId);

        paymentService.deletePaymentById(paymentId);
        System.out.println("Payment deleted for ID: " + paymentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/participant/{participantId}")
    public ResponseEntity<List<Payment>> getPaymentsByParticipantId(@PathVariable long participantId) {
        System.out.println("Received a request to fetch payments for participant ID: " + participantId);

        List<Payment> payments = paymentService.findPaymentsByParticipantId(participantId);
        if (payments.isEmpty()) {
            System.out.println("No payments found for participant ID: " + participantId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        System.out.println("Returning payments for participant ID " + participantId + ": " + payments);
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<Payment> findPaymentById(@PathVariable long paymentId) throws PaymentNotFoundException {
        System.out.println("Received a request to fetch payment by ID: " + paymentId);

        Optional<Payment> payment = paymentService.findPaymentById(paymentId);
        if (!payment.isPresent()) {
            System.out.println("Payment not found for ID: " + paymentId);
            throw new PaymentNotFoundException("Payment with ID " + paymentId + " not found.");
        }

        System.out.println("Returning payment for ID " + paymentId + ": " + payment.get());
        return new ResponseEntity<>(payment.get(), HttpStatus.OK);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<Payment>> getPaymentsByBookingId(@PathVariable long bookingId) throws PaymentNotFoundException {
        System.out.println("Received a request to fetch payments for booking ID: " + bookingId);

        List<Payment> payments = paymentService.getPaymentsByBookingId(bookingId);
        if (payments.isEmpty()) {
            System.out.println("No payments found for booking ID: " + bookingId);
            throw new PaymentNotFoundException("Payments with booking ID " + bookingId + " not found.");
        }

        System.out.println("Returning payments for booking ID " + bookingId + ": " + payments);
        return ResponseEntity.ok(payments);
    }

    @DeleteMapping("/deleteBooking/{bookingId}")
    public ResponseEntity<String> deletePaymentsByBookingId(@PathVariable long bookingId) {
        System.out.println("Received a request to delete payments for booking ID: " + bookingId);

        paymentService.deletePaymentsByBookingId(bookingId);
        System.out.println("Payments for Booking ID " + bookingId + " have been deleted.");

        return ResponseEntity.ok("Payments for Booking ID " + bookingId + " have been deleted.");
    }
}
