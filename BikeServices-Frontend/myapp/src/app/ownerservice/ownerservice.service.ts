import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../services/strict-http-response";
import {Servicesdto} from "../services/models/servicesdto";
import {BikeServices} from "../services/models/bike-services";

@Injectable({
  providedIn: 'root'
})
export class OwnerserviceService {

  private url = "http://localhost:8080/api/owners/delete-service";
  constructor(private http: HttpClient) { }

  deleteService(id:number):Observable<StrictHttpResponse<string>> {
     const headers:HttpHeaders = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.delete<StrictHttpResponse<string>>(`http://localhost:8080/api/owners/delete-service/${id}`,{responseType:"text" as "json"});
  }

  displayService(): Observable<BikeServices[]> {
    // const headers:HttpHeaders = new HttpHeaders({'content-type':'text/plain'});
    return this.http.get<BikeServices[]>("http://localhost:8080/api/owners/your-services");
  }
}
