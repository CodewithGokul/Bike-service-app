import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BikeServices} from "../services/models/bike-services";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../services/strict-http-response";
import {Servicesdto} from "../services/models/servicesdto";

@Injectable({
  providedIn: 'root'
})
export class AddserviceService {
   apiurl:string = "http://localhost:8080/api/owners/add-services";
  constructor(private http: HttpClient) { }

  addService(service:Servicesdto): Observable<Observable<StrictHttpResponse<string>>> {
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});

    return this.http.post<Observable<StrictHttpResponse<string>>>(this.apiurl,service,{responseType:"text" as "json"});
  }

}
