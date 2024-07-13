/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Customers } from '../../models/customers';
import { Customersignupdto } from '../../models/customersignupdto';

export interface SetCustomerSignup$Params {
      body: Customersignupdto
}

export function setCustomerSignup(http: HttpClient, rootUrl: string, params: SetCustomerSignup$Params, context?: HttpContext): Observable<StrictHttpResponse<Customers>> {
  const rb = new RequestBuilder(rootUrl, setCustomerSignup.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Customers>;
    })
  );
}

setCustomerSignup.PATH = '/api/auth/customer/signup';
