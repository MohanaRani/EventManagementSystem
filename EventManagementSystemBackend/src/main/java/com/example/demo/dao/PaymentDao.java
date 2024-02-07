package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Payment;

@Repository
public interface PaymentDao extends JpaRepository<Payment, Long> {
    List<Payment> findByBookingId(long bookingId); // Admin
    List<Payment> findByParticipantsParticipantId(long participantId);
}
