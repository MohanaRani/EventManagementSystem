package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Payment;

public interface PaymentService {
    
    Payment addPayment(Payment payment, long bookingId, long participantId);

    List<Payment> getAllPayments();

    Optional<Payment> findPaymentById(long paymentId);

    void deletePaymentById(long paymentId);

    List<Payment> getPaymentsByBookingId(long bookingId);

    void deletePaymentsByBookingId(long bookingId);

    List<Payment> findPaymentsByParticipantId(long participantId);
}

