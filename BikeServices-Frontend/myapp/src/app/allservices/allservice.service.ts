import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Servicesdto} from "../services/models/servicesdto";
import {CustomerServiceResponse} from "../services/models/customer-service-response";
import {Bookingdto} from "../services/models/bookingdto";

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {
  apiUrl = "http://localhost:8080/api/customers/services";

  constructor(
    private http: HttpClient
  ) { }

  getServices(): Observable<CustomerServiceResponse[]> {
    return this.http.get<any>(this.apiUrl);
  }
  postBooking(id:number|undefined,Booking:Bookingdto){
    return this.http.post(`http://localhost:8080/api/customers/services/${id}`,Booking)
  }

}
