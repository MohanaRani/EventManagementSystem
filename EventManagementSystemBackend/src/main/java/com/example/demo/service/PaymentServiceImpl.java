package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Payment;
import com.example.demo.service.ParticipantService;
import com.example.demo.entity.Participants;
import com.example.demo.entity.Booking;
import com.example.demo.dao.BookingDao;
import com.example.demo.dao.PaymentDao;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentDao paymentDao;
    private final BookingDao bookingDao;
    private final ParticipantService participantService;

    @Autowired
    public PaymentServiceImpl(PaymentDao paymentDao, BookingDao bookingDao, ParticipantService participantService) {
        this.paymentDao = paymentDao;
        this.bookingDao = bookingDao;
        this.participantService = participantService;
    }

    @Override
    public Payment addPayment(Payment payment, long bookingId, long participantId) {
        Booking booking = bookingDao.getById(bookingId);
        payment.setBookingId(bookingId);
        payment.setTotalPrice(booking.getAmount());
        payment.setPaidDate(LocalDate.now());
        payment.setPaidAmount(booking.getAmount());

        if (payment.getTotalPrice() == payment.getPaidAmount()) {
            booking.setStatus("Paid");
        } else {
            booking.setStatus("Not Paid");
        }

        Participants participant = participantService.findParticipantById(participantId).orElse(null);
        payment.setParticipants(participant);
        return paymentDao.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentDao.findAll();
    }

    @Override
    public Optional<Payment> findPaymentById(long id) {
        return paymentDao.findById(id);
    }

    @Override
    public List<Payment> getPaymentsByBookingId(long bookingId) {
        return paymentDao.findByBookingId(bookingId);
    }

    @Override
    public void deletePaymentsByBookingId(long bookingId) {
        paymentDao.findByBookingId(bookingId).forEach(paymentDao::delete);
    }

    @Override
    public List<Payment> findPaymentsByParticipantId(long participantId) {
        return paymentDao.findByParticipantsParticipantId(participantId);
    }

	@Override
	public void deletePaymentById(long paymentId) {
		if (paymentDao.existsById(paymentId)) {
            paymentDao.deleteById(paymentId);
        }
	}
}
