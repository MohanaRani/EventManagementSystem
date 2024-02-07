import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementSystemService } from '../../../service/eventmanagementsystem.service';
import { Admin } from '../../../class/admin';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent {
payment:any;
  hasSearchId: boolean = false;
  searchId!: number; 
p: number = 1;
count: number = 5;
  admin: Admin | undefined;
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
  
      this.getAllPayments();
      this.checkSessionAndNavigate();
    });
  }
  
      getAllPayments()
    {
      this.hasSearchId = this.activeRoute.snapshot.paramMap.has("bookingId");
         if(this.hasSearchId)
         {this.searchId  = Number(this.activeRoute.snapshot.paramMap.get("bookingId"));
          console.log(this.searchId)
          this.eventmanagementsystemService.getpaymentbyid(this.searchId).subscribe(data=>{
          console.log(data);
          this.payment= data;
          })
        }
        else{
        this.eventmanagementsystemService.getAllPayments().subscribe(data=>{
          console.log(data);
          this.payment=data;
        });
      }
    }
    deleteBooking(id:number):void{
      console.log(id);
      if(confirm("Do you want to delete ?")){
        this.eventmanagementsystemService.deletePayment(id).subscribe(data=>{
          console.log(data);
          this.getAllPayments();
        })
      };
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
