import {Component, OnInit} from '@angular/core';
import {AllserviceService} from "./allservice.service";
import {Router} from "@angular/router";
import {Servicesdto} from "../services/models/servicesdto";
import {CustomerServiceResponse} from "../services/models/customer-service-response";
import {Bookingdto} from "../services/models/bookingdto";

@Component({
  selector: 'app-allservices',
  templateUrl: './allservices.component.html',
  styleUrl: './allservices.component.css'
})
export class AllservicesComponent implements OnInit {
logout() {
this.authRequest.logout();
}

  book:boolean = false;
  services:CustomerServiceResponse[]= []
  bookid:number|undefined = 0;
  CustomerBooking:Bookingdto = {
    'model':'',
    'brand':'',
    'year':undefined,
    'vehicleNumber':'',
      'date':''
  }
  isbooked: boolean = false;

  constructor(
    private authRequest:AllserviceService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.displayService()
  }
  displayService():void{
    this.authRequest.getServices().subscribe({
      next:(res)=>{
        this.services = res as CustomerServiceResponse[];
      }
    })
  }
  closeBook() {
    this.book = false;
  }


  setBook(id:number|undefined){
    console.log("Triggered")
    this.bookid = id;
    this.book = true;
  }

  BookService(){
    this.authRequest.postBooking(this.bookid,this.CustomerBooking).subscribe({
      next:(response)=>{
        this.book=false;
        this.isbooked = false
        this.displayService();
        alert("Booked Successfully")
        this.CustomerBooking = {}
      }
    })
  }

  enableBooking() {

    this.isbooked = true;
  }
}
