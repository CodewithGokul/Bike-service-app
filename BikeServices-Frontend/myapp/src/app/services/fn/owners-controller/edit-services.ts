/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BikeServices } from '../../models/bike-services';

export interface EditServices$Params {
  serviceId: number;
      body: BikeServices
}

export function editServices(http: HttpClient, rootUrl: string, params: EditServices$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, editServices.PATH, 'patch');
  if (params) {
    rb.path('serviceId', params.serviceId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

editServices.PATH = '/api/owners/edit-service/{serviceId}';
