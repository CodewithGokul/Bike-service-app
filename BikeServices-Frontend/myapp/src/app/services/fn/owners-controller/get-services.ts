/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BikeServices } from '../../models/bike-services';

export interface GetServices$Params {
}

export function getServices(http: HttpClient, rootUrl: string, params?: GetServices$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BikeServices>>> {
  const rb = new RequestBuilder(rootUrl, getServices.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BikeServices>>;
    })
  );
}

getServices.PATH = '/api/owners/your-services';
