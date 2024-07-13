import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerbookingService {

  constructor(
    private http:HttpClient
  ) { }

    getBookingstatus(){
      return this.http.get("http://localhost:8080/api/customers/booking-status")
}

deleteBooking(id:number){
    const Headers = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.delete(`http://localhost:8080/api/customers/deletebooking/${id}`,{responseType:"text" as "json"});
}
}
