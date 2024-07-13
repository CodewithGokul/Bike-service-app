import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../services/strict-http-response";
import {Servicesdto} from "../services/models/servicesdto";

@Injectable({
  providedIn: 'root'
})
export class OwnerserviceService {
  private url = "http://localhost:8080/api/owners/delete-service";
  private url1 = "http://localhost:8080/api/owners/edit-service/{service-id}";
  constructor(private http: HttpClient) { }

  deleteService(id:number):Observable<StrictHttpResponse<string>> {
     const headers:HttpHeaders = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.delete<StrictHttpResponse<string>>(`http://localhost:8080/api/owners/delete-service/${id}`,{responseType:"text" as "json"});
  }

}
