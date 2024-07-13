import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Bookings} from "../services/models/bookings";
import {Observable} from "rxjs";
import {BookingResponse} from "../services/models/booking-response";
import {SetStatus} from "../services/models/set-status";

@Injectable({
  providedIn: 'root'
})
export class OwnerbookService {
   private url = "http://localhost:8080/api/owners/bookings";

  constructor(
    private Http: HttpClient,
  ) { }

  getBooking():Observable<BookingResponse[]> {
    return this.Http.get<BookingResponse[]>(this.url);
  }

  editStatus(bookingId: number, status: SetStatus["status"]): Observable<string> {
    const body: SetStatus = { status: status };
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.Http.patch<string>(`http://localhost:8080/api/owners/edit-status/${bookingId}`,{status}, {responseType:"text" as "json"});
  }

}
