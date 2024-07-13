/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addServices } from '../fn/owners-controller/add-services';
import { AddServices$Params } from '../fn/owners-controller/add-services';
import { BikeServices } from '../models/bike-services';
import { BookingResponse } from '../models/booking-response';
import { deleteService } from '../fn/owners-controller/delete-service';
import { DeleteService$Params } from '../fn/owners-controller/delete-service';
import { editServices } from '../fn/owners-controller/edit-services';
import { EditServices$Params } from '../fn/owners-controller/edit-services';
import { getBookings } from '../fn/owners-controller/get-bookings';
import { GetBookings$Params } from '../fn/owners-controller/get-bookings';
import { getServices } from '../fn/owners-controller/get-services';
import { GetServices$Params } from '../fn/owners-controller/get-services';
import { updateBookingStatus } from '../fn/owners-controller/update-booking-status';
import { UpdateBookingStatus$Params } from '../fn/owners-controller/update-booking-status';

@Injectable({ providedIn: 'root' })
export class OwnersControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addServices()` */
  static readonly AddServicesPath = '/api/owners/add-services';

  /**
   * Add Services.
   *
   * This Api Showing  Add Services To The Store
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addServices()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addServices$Response(params: AddServices$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return addServices(this.http, this.rootUrl, params, context);
  }

  /**
   * Add Services.
   *
   * This Api Showing  Add Services To The Store
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addServices$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addServices(params: AddServices$Params, context?: HttpContext): Observable<string> {
    return this.addServices$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `updateBookingStatus()` */
  static readonly UpdateBookingStatusPath = '/api/owners/edit-status/{bookId}';

  /**
   * Edit The Status.
   *
   * Here Owner Will Edit The Status Of Booking The Status Contains:ACCEPTED,REJECTED,NONDELIVERY,DELIVERY NOTE:You Should Give Status As It is mentioned<br>NONDELIVERY: The Mail sent to User For Remainder to Take Bike<br>ACCEPTED:It is Used For Indicating The Customer That Order is Accepted and Mail will sent to remaind to give bike
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBookingStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBookingStatus$Response(params: UpdateBookingStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateBookingStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * Edit The Status.
   *
   * Here Owner Will Edit The Status Of Booking The Status Contains:ACCEPTED,REJECTED,NONDELIVERY,DELIVERY NOTE:You Should Give Status As It is mentioned<br>NONDELIVERY: The Mail sent to User For Remainder to Take Bike<br>ACCEPTED:It is Used For Indicating The Customer That Order is Accepted and Mail will sent to remaind to give bike
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateBookingStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBookingStatus(params: UpdateBookingStatus$Params, context?: HttpContext): Observable<string> {
    return this.updateBookingStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `editServices()` */
  static readonly EditServicesPath = '/api/owners/edit-service/{serviceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editServices()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editServices$Response(params: EditServices$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return editServices(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editServices$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editServices(params: EditServices$Params, context?: HttpContext): Observable<string> {
    return this.editServices$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getServices()` */
  static readonly GetServicesPath = '/api/owners/your-services';

  /**
   * Owner's Services.
   *
   * This Api Showing  All Services By Owner
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServices$Response(params?: GetServices$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BikeServices>>> {
    return getServices(this.http, this.rootUrl, params, context);
  }

  /**
   * Owner's Services.
   *
   * This Api Showing  All Services By Owner
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getServices(params?: GetServices$Params, context?: HttpContext): Observable<Array<BikeServices>> {
    return this.getServices$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BikeServices>>): Array<BikeServices> => r.body)
    );
  }

  /** Path part for operation `getBookings()` */
  static readonly GetBookingsPath = '/api/owners/bookings';

  /**
   * Display Bookings.
   *
   * This Api Showing  All Bookings Gained By The Owner Here Remain The Book-Id For Edit Status
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookings$Response(params?: GetBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingResponse>>> {
    return getBookings(this.http, this.rootUrl, params, context);
  }

  /**
   * Display Bookings.
   *
   * This Api Showing  All Bookings Gained By The Owner Here Remain The Book-Id For Edit Status
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookings(params?: GetBookings$Params, context?: HttpContext): Observable<Array<BookingResponse>> {
    return this.getBookings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingResponse>>): Array<BookingResponse> => r.body)
    );
  }

  /** Path part for operation `deleteService()` */
  static readonly DeleteServicePath = '/api/owners/delete-service/{serviceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteService()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteService$Response(params: DeleteService$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteService(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteService(params: DeleteService$Params, context?: HttpContext): Observable<string> {
    return this.deleteService$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
