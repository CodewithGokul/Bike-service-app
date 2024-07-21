import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Component, model, OnInit } from '@angular/core';
import { AllserviceService } from './allservice.service';
import { Router } from '@angular/router';
import { Servicesdto } from '../services/models/servicesdto';
import { CustomerServiceResponse } from '../services/models/customer-service-response';
import { Bookingdto } from '../services/models/bookingdto';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-allservices',
  templateUrl: './allservices.component.html',
  styleUrl: './allservices.component.css',
})
export class AllservicesComponent implements OnInit {
  isbooked: boolean = false;
  enablerror: boolean = false;
  book: boolean = false;
  services: CustomerServiceResponse[] = [];
  bookid: number | undefined = 0;

  constructor(private authRequest: AllserviceService, private router: Router) {}

  ngOnInit(): void {
    this.displayService();
  }
  displayService(): void {
    this.authRequest.getServices().subscribe({
      next: (res) => {
        this.services = res as CustomerServiceResponse[];
      },
    });
  }
  closeBook() {
    this.book = false;
    this.isbooked = false;
    this.enablerror = false;
    this.bookingForm.reset();
  }

  setBook(id: number | undefined) {
    console.log('Triggered');
    this.bookid = id;
    this.book = true;
  }

  BookService() {
    this.enablerror = true;

    if (this.bookingForm.valid) {
      this.isbooked = true;
      console.log(this.bookingForm.value);
      this.authRequest
        .postBooking(this.bookid, this.bookingForm.value as Bookingdto)
        .subscribe({
          next: (response) => {
            this.book = false;
            this.isbooked = false;
            this.displayService();
            this.closeBook();
            alert('Booked Successfully');
          },
          error: (err) => {
            this.closeBook();
            alert('Submission Failed!! Pls Check Internet Connection');
          },
        });
    }
  }

  enableBooking() {
    this.isbooked = true;
  }

  enableError() {
    this.enablerror = true;
  }

  logout() {
    this.authRequest.logout();
  }

  // 'model':'',
  // 'brand':'',
  // 'year':undefined,
  // 'vehicleNumber':'',
  //   'date':''

  bookingForm = new FormGroup({
    model: new FormControl(null, [Validators.required]),
    brand: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
    vehicleNumber: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
  });
}
