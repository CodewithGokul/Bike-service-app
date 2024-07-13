/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingResponse } from '../../models/booking-response';

export interface GetAllBookings$Params {
}

export function getAllBookings(http: HttpClient, rootUrl: string, params?: GetAllBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllBookings.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookingResponse>>;
    })
  );
}

getAllBookings.PATH = '/api/customers/booking-status';
