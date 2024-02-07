package com.example.demo.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;



@Entity
@Table(name="payments_table")
@SequenceGenerator(name = "generator5", sequenceName = "gen5", initialValue = 20000)
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator5")
	@Column(name = "payment_id")
private long paymentId;
	

@Column(name="total_price")
private  double totalPrice;

@Column(name="booking_id",unique=true)
private  long bookingId;



@Column(name="name_on_card") 	
@NotEmpty
@Size(min=3 , message="name must contain atleast 3 characters")
private String nameOnCard;

@Column(name="card_number")
@NotEmpty
@Size(min=16 , max=16,message="cardNumber must contain 16 digits")
private String cardNumber;

@Column(name="exp_year")
private String expYear;

@Column(name="cvv")
@NotNull
private int cvv;

@Column(name = "paid_date")
private LocalDate PaidDate;

@Column(name = "paid_amount", nullable = false)
private double paidAmount;


@ManyToOne( cascade=CascadeType.MERGE)
@JoinColumn(name="participant_id")

private Participants participants;

public Payment()
{
  
}
public Payment(long paymentId, double totalPrice, long bookingId,
		@NotEmpty @Size(min = 3, message = "name must contain atleast 3 characters") String nameOnCard,
		@NotEmpty @Size(min = 16, max = 16, message = "cardNumber must contain 16 digits") String cardNumber,
		String expYear, @NotNull int cvv, LocalDate paidDate, double paidAmount, Participants participants) {
	super();
	this.paymentId = paymentId;
	this.totalPrice = totalPrice;
	this.bookingId = bookingId;
	this.nameOnCard = nameOnCard;
	this.cardNumber = cardNumber;
	this.expYear = expYear;
	this.cvv = cvv;
	PaidDate = paidDate;
	this.paidAmount = paidAmount;
	this.participants = participants;
}
public long getBookingId() {
	return bookingId;
}
public void setBookingId(long bookingId) {
	this.bookingId = bookingId;
}
public Participants getParticipants() {
	return participants;
}
public void setParticipants(Participants participants) {
	this.participants = participants;
}
public long getPaymentId() {
	return paymentId;
}

public void setPaymentId(long paymentId) {
	this.paymentId = paymentId;
}
public double getTotalPrice() {
	return totalPrice;
}
public void setTotalPrice(double totalPrice) {
	this.totalPrice = totalPrice;
}
public String getNameOnCard() {
	return nameOnCard;
}

public void setNameOnCard(String nameOnCard) {
	this.nameOnCard = nameOnCard;
}
public String getCardNumber() {
	return cardNumber;
}

public void setCardNumber(String cardNumber) {
	this.cardNumber = cardNumber;
}

public String getExpYear() {
	return expYear;
}

public void setExpYear(String expYear) {
	this.expYear = expYear;
}

public int getCvv() {
	return cvv;
}

public void setCvv(int cvv) {
	this.cvv = cvv;
}

public LocalDate getPaidDate() {
	return PaidDate;
}

public void setPaidDate(LocalDate paidDate) {
	PaidDate = paidDate;
}

public double getPaidAmount() {
	return paidAmount;
}

public void setPaidAmount(double paidAmount) {
	this.paidAmount = paidAmount;
}
@Override
public String toString() {
	return "Payment [paymentId=" + paymentId + ", totalPrice=" + totalPrice + ", bookingId=" + bookingId
			+ ", nameOnCard=" + nameOnCard + ", cardNumber=" + cardNumber + ", expYear=" + expYear + ", cvv=" + cvv
			+ ", PaidDate=" + PaidDate + ", paidAmount=" + paidAmount + ", participants=" + participants + "]";
}
}