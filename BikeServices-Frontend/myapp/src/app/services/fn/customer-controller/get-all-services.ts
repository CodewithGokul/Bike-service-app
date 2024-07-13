/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CustomerServiceResponse } from '../../models/customer-service-response';

export interface GetAllServices$Params {
}

export function getAllServices(http: HttpClient, rootUrl: string, params?: GetAllServices$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CustomerServiceResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllServices.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CustomerServiceResponse>>;
    })
  );
}

getAllServices.PATH = '/api/customers/services';
