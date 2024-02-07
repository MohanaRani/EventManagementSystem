import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';
import { participant } from '../../../../class/participant';
import { Booking } from '../../../../class/booking';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  participant!: participant;
  booking!: Booking;
  generatedBookingId!: number;
  cust!: number;
  payment: any = {
    nameOnCard: '',
    cardNumber: '',
    expYear: '',
    cvv: '',
    paidAmount: 0
  };
  eventmanagementsystemService: any;
  constructor(private activeRoute: ActivatedRoute,private router: Router,private eventmanagementsystem: EventManagementSystemService) {}
 
  ngOnInit(): void {
    this.generatedBookingId = Number(localStorage.getItem("generatedBookingId"));
    this.getBookingByBookingId();

    // Safely parse participant from sessionStorage
    const participantString = sessionStorage.getItem("participant");
    if (participantString) {
        this.participant = JSON.parse(participantString);
        this.cust = this.participant.participantId;
    }

    this.checkSessionAndNavigate();
}

  onSubmit() {
    this.eventmanagementsystem.addPayment(this.payment, this.generatedBookingId, this.cust).subscribe(
      () => {
        
        console.log(this.payment);
        console.log('Payment added successfully');
        alert("Payment added successfully")
        localStorage.clear()
        this.router.navigateByUrl("/participant/mybookings")
      },
      (error) => {
        console.error('Error adding payment', error); 
      }
    );
  }

 
  getBookingByBookingId() {
    // Implement your logic to fetch booking by ID using the service
    const generatedBookingId = Number(localStorage.getItem('generatedBookingId'));

    if (generatedBookingId) {
      this.eventmanagementsystemService.getBookingByBookingId(generatedBookingId).subscribe(
        (data: any) => {
          console.log(data);
          // Further processing...
        },
        (error: any) => {
          console.error('Error fetching order', error);
        }
      );
    }
  }

  
  checkSessionAndNavigate() {
    if (!this.participant) {
      this.router.navigateByUrl("/participant/login");
    }
  }
}