import { Component, OnInit } from '@angular/core';
import { OwnerserviceService } from '../ownerservice/ownerservice.service';
import { BookingResponse } from '../services/models/booking-response';
import { OwnerbookService } from './ownerbook.service';
import { SetStatus } from '../services/models/set-status';

@Component({
  selector: 'app-ownerbooking',
  templateUrl: './ownerbooking.component.html',
  styleUrls: ['./ownerbooking.component.css'] // Correct the typo here
})
export class OwnerbookingComponent implements OnInit {
  Booking: BookingResponse[] = [];
  filteredBookings: BookingResponse[] = [];
  ischangeEnabled: boolean = false;
  load:boolean = false;
  status: SetStatus['status'];
  selectedBookId: number = 0;
  selectedStatus: string = '';

  constructor(private books: OwnerbookService) {}

  ngOnInit(): void {
    this.fetchBooking();
  }

  viewChange(booking: BookingResponse) {
    this.ischangeEnabled = true;
    this.selectedBookId = booking.bookId;
    this.status = booking.status; // Set the initial status
  }

  changeStatus() {
    this.load = true
    this.books.editStatus(this.selectedBookId, this.status).subscribe({
      next: (response: string) => {
        alert(response);
        this.ischangeEnabled = false; // Hide the change status UI after saving
        this.load = false;
        this.fetchBooking(); // Refresh the bookings list
      },error(err) {
          alert("Status Not Change Check Your Internet Connection...");
          
      },
    })
    
  }

  private fetchBooking() {
    this.books.getBooking().subscribe({
      next: (res) => {
        this.Booking = res;
        this.filterBookings(); // Apply initial filter (if any)
      }
    });
  }

  filterBookings() {
    if (this.selectedStatus) {
      this.filteredBookings = this.Booking.filter(booking => booking.status === this.selectedStatus);
    } else {
      this.filteredBookings = this.Booking;
    }
  }
}
