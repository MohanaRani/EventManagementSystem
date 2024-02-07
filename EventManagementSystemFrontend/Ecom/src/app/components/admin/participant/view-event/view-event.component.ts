

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { participant } from '../../../../class/participant';
import { EventManagementSystemService } from '../../../../service/eventmanagementsystem.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent {
tempevent: any;
  count :number=5;
p: any;
  event:any;
  participant!: participant;
  hasSearchName!: boolean;
    searchName!: string;
deleteEvent: any;
    constructor(private eventmanagementsystemservice:EventManagementSystemService,public router:Router, private activeRoute:ActivatedRoute) { }
    ngOnInit(): void {
      const participantString = sessionStorage.getItem("participant");
    
      if (participantString) {
        this.participant = JSON.parse(participantString);
        this.activeRoute.paramMap.subscribe(() => this.getAllEvent());
      } else {
        // Handle the case when participantString is null
        // You might want to add some error handling or redirect the user
        console.error('Participant data not found in sessionStorage');
      }
    
      this.checkSessionAndNavigate();
    }
    
    // getPaymentbyparticipantid() {
    //   const pay_id = this.participant.participantId;
  
    //   console.log(pay_id);
    //   if (pay_id > 0) {
    //     this.isEditable = true;
    //     this.eventmanagementsystemservice.getpaymentparticipantbyid(pay_id).subscribe(data => {
    //       this.payment = data;
    //       console.log(this.payment)
    //     });
    //   }
  
    // ngOnInit(): void {
    //   this.activeRoute.paramMap.subscribe(() => {
    //     // Using optional chaining to safely access sessionStorage.getItem("participant")
    //     const participantString = sessionStorage.getItem("participant");
        
    //     // Using nullish coalescing to provide a default value if participantString is null or undefined
    //     this.participant = JSON.parse(participantString ?? '{}');
    
    //     // Check if this.participant is not null or undefined before accessing its properties
    //     if (this.participant?.['someProperty']) {
    //       // Your logic here
    //       this.getAllEvent();
    //       this.checkSessionAndNavigate();
    //     }
    //   });
    // }
   

    // getAllEvent() {
    //   this.hasSearchName = this.activeRoute.snapshot.paramMap.has("modelEventName");
    
    //   if (this.hasSearchName) {
    //     // Use nullish coalescing to provide a default value when this.searchName is null or undefined
    //     this.searchName = this.activeRoute.snapshot.paramMap.get("modelEventName") ?? '';
    //     console.log(this.searchName);
    
    //     this.eventmanagementsystemservice.getAllEvent(this.searchName).subscribe((data: any) => {
    //       console.log(data);
    //       this.event = data;
    //     });
    //   } else {
    //     this.eventmanagementsystemservice.getAllEvent().subscribe(data => {
    //       console.log(data);
    //       this.event = data;
    //     });
    //   }
    // }
    getAllEvent() {
      this.hasSearchName = this.activeRoute.snapshot.paramMap.has("modelEventName");
    
      // Provide a default value if modelEventName is not present in the route
      this.searchName = this.activeRoute.snapshot.paramMap.get("modelEventName") ?? '';
    
      console.log(this.searchName);
    
      if (this.hasSearchName) {
        this.eventmanagementsystemservice.getAllEvent().subscribe((data: any) => {
          console.log(data);
          this.event = data;
        });
      } else {
        this.eventmanagementsystemservice.getAllEvent().subscribe(data => {
          console.log(data);
          this.event = data;
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

   bookingEvent(id:number)
  {
    this.router.navigateByUrl("participant/placebooking/"+id);
  
  }
  checkSessionAndNavigate() {
    if (!this.participant) {
      this.router.navigateByUrl("/participant/login");
    }

  }
}