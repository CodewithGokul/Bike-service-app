import { Component, OnInit } from '@angular/core';
import { CustomerbookingService } from './customerbooking.service';
import { Router } from '@angular/router';
import { BookingResponse } from '../services/models/booking-response';

@Component({
  selector: 'app-customerbooking',
  templateUrl: './customerbooking.component.html',
  styleUrls: ['./customerbooking.component.css']
})
export class CustomerbookingComponent implements OnInit {
  bookingStatus: BookingResponse[] = [];
  filteredBookings: BookingResponse[] = [];
  filterStatus: string = '';
isCancel:boolean = false;
  constructor(
    private customerbookingService: CustomerbookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus() {
    this.customerbookingService.getBookingstatus().subscribe({
      next: (res) => {
        this.bookingStatus = res as BookingResponse[];
        console.log(res)
        this.applyFilter();
      }
    });
  }

  applyFilter() {
    this.filteredBookings = this.filterStatus ?
      this.bookingStatus.filter(booking => booking.status === this.filterStatus) :
      this.bookingStatus;
  }

  deleteBooking(id:number) {
    this.customerbookingService.deleteBooking(id).subscribe(
      {
        next: (res) => {
          alert(res)
          this.getStatus()
        }
      }
    )
  }
}
