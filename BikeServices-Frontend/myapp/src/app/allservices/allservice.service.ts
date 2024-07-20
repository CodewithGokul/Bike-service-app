import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Servicesdto} from "../services/models/servicesdto";
import {CustomerServiceResponse} from "../services/models/customer-service-response";
import {Bookingdto} from "../services/models/bookingdto";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {
  
  apiUrl = "http://localhost:8080/api/customers/services";

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  getServices(): Observable<CustomerServiceResponse[]> {
    return this.http.get<any>(this.apiUrl);
  }
  postBooking(id:number|undefined,Booking:Bookingdto){
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});

    return this.http.post(`http://localhost:8080/api/customers/services/${id}`,Booking,{responseType:"text" as "json"})
  }

  logout() {
      localStorage.removeItem('token')
      this.router.navigate(['/']);
  }
}
