import { participant } from "./participant";
export class Payment {
    paymentId: number;
    totalPrice: number;
    bookingId: number;
    nameOnCard: string;
    cardNumber: string;
    expYear: string;
    cvv: number;
    paidDate: Date;
    paidAmount: number;
    participant: participant;

    constructor(
        paymentId: number,
        totalPrice: number,
        bookingId: number,
        nameOnCard: string,
        cardNumber: string,
        expYear: string,
        cvv: number,
        paidDate: Date,
        paidAmount: number,
        participant: participant
    ) {
        this.paymentId = paymentId;
        this.totalPrice = totalPrice;
        this.bookingId = bookingId;
        this.nameOnCard = nameOnCard;
        this.cardNumber = cardNumber;
        this.expYear = expYear;
        this.cvv = cvv;
        this.paidDate = paidDate;
        this.paidAmount = paidAmount;
        this.participant = participant;
    }
}
