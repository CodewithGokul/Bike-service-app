/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Bookingdto } from '../../models/bookingdto';
import { Bookings } from '../../models/bookings';

export interface AddBooking$Params {
  serviceId: number;
      body: Bookingdto
}

export function addBooking(http: HttpClient, rootUrl: string, params: AddBooking$Params, context?: HttpContext): Observable<StrictHttpResponse<Bookings>> {
  const rb = new RequestBuilder(rootUrl, addBooking.PATH, 'post');
  if (params) {
    rb.path('serviceId', params.serviceId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Bookings>;
    })
  );
}

addBooking.PATH = '/api/customers/services/{serviceId}';
