import { Injectable } from '@angular/core';
import {Servicesdto} from "../services/models/servicesdto";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../services/strict-http-response";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {

  constructor(
    private http: HttpClient,
  ) { }


  editService(id:number|undefined,service:Servicesdto): Observable<Observable<StrictHttpResponse<string>>> {
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});
    return this.http.patch<Observable<StrictHttpResponse<string>>>(`http://localhost:8080/api/owners/edit-service/${id}`, service,{responseType:"text" as "json"});
  }
}
