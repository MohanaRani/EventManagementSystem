
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../service/eventmanagementsystem.service';
import { Admin } from '../../../class/admin';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.css']
})
export class participantViewComponent implements OnInit{
  hasSearchId!: boolean;
  searchId!: number;

participant : any;
  hasSearchName!: boolean;
  searchName!: string;
  admin!: Admin;
  p: number = 1;
count: number = 5;
constructor(private eventmanagementsystemService:EventManagementSystemService,public router:Router, private activeRoute:ActivatedRoute) { }


ngOnInit(): void {
  this.activeRoute.paramMap.subscribe(() => {
    const adminString = sessionStorage.getItem("admin");

    if (adminString) {
      try {
        this.admin = JSON.parse(adminString);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        // Handle the error, e.g., show an error message or redirect to login
      }
    } else {
      // Handle the case when adminString is null
      // You might want to add some error handling or redirect the user
      console.error('Admin data not found in sessionStorage');
    }

    this.getAllParticipant();
    this.checkSessionAndNavigate();
  });
}

getAllParticipant()
{
  this.hasSearchId = this.activeRoute.snapshot.paramMap.has("ParticipantId");
     if(this.hasSearchId)
     {this.searchId  = Number(this.activeRoute.snapshot.paramMap.get("ParticipantId"));
      console.log(this.searchId)
      this.eventmanagementsystemService['getparticipantbyid'](this.searchId).subscribe((data: any)=>{
      console.log(data);
      this.participant= data;
      })
    }
    else{
    this.eventmanagementsystemService.getAllParticipant().subscribe((data: any)=>{
      console.log(data);
      this.participant=data;
    });
  }
}
deleteparticipant(participantId:number):void{
      console.log(participantId);
      if(confirm("Do you want to delete ?")){
        this.eventmanagementsystemService['deleteparticipant'](participantId).subscribe((data: any)=>{
          console.log(data);
          this.getAllParticipant();
        })
      };
    }

    
    
  
  
  updateParticipate(id:number)
  {
    this.router.navigateByUrl("/updateParticipant/"+id);
  
  }


  logout() {
    if (sessionStorage.getItem("admin")) {
      sessionStorage.clear()
      localStorage.clear()
      alert("Logout Successfully")
      this.router.navigateByUrl("/admin/login")
    }
    else {
      alert("No user loged in")
    }
  }
  checkSessionAndNavigate() {
    if (!this.admin) {
      this.router.navigateByUrl("/admin/login");
    }
  }
}
