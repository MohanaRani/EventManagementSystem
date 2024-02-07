import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { participant } from '../../../../class/participant';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';

@Component({
  selector: 'app-my-payment',
  templateUrl: './my-payment.component.html',
  styleUrls: ['./my-payment.component.css']
})
export class MyPaymentComponent implements OnInit {
  payment: any
  participant!: participant;
  isEditable!: boolean;
  p: number = 1;
  count: number = 5;

  constructor(private eventmanagementsystemservice: EventManagementSystemService, private router: Router, private activateRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    const participantString = sessionStorage.getItem("participant");
  
    if (participantString) {
      this.participant = JSON.parse(participantString);
      this.activateRoute.paramMap.subscribe(() => this.getPaymentbyparticipantid());
    } else {
      // Handle the case when participantString is null
      // You might want to add some error handling or redirect the user
      console.error('Participant data not found in sessionStorage');
    }
  
    this.checkSessionAndNavigate();
  }
  
  getPaymentbyparticipantid() {
    const pay_id = this.participant.participantId;

    console.log(pay_id);
    if (pay_id > 0) {
      this.isEditable = true;
      this.eventmanagementsystemservice.getpaymentparticipantbyid(pay_id).subscribe(data => {
        this.payment = data;
        console.log(this.payment)
      });
    }

  }
  logout() {
    if (sessionStorage.getItem("participant")) {
      sessionStorage.clear()
      localStorage.clear()
      alert("Logout Successfully")
      this.router.navigateByUrl("/participant/login")
    }
    else {
      alert("No user loged in")
    }
  }
  checkSessionAndNavigate() {
    if (!this.participant) {
      this.router.navigateByUrl("/participant/login");
    }

  }
}