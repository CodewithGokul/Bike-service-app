/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addBooking } from '../fn/customer-controller/add-booking';
import { AddBooking$Params } from '../fn/customer-controller/add-booking';
import { BookingResponse } from '../models/booking-response';
import { Bookings } from '../models/bookings';
import { CustomerServiceResponse } from '../models/customer-service-response';
import { getAllBookings } from '../fn/customer-controller/get-all-bookings';
import { GetAllBookings$Params } from '../fn/customer-controller/get-all-bookings';
import { getAllServices } from '../fn/customer-controller/get-all-services';
import { GetAllServices$Params } from '../fn/customer-controller/get-all-services';

@Injectable({ providedIn: 'root' })
export class CustomerControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addBooking()` */
  static readonly AddBookingPath = '/api/customers/services/{serviceId}';

  /**
   * Choose Service and Book.
   *
   * This Api Is for Customer To choose The Service and Booked and Booked Notification sended in EMAIL to OWNER
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBooking()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBooking$Response(params: AddBooking$Params, context?: HttpContext): Observable<StrictHttpResponse<Bookings>> {
    return addBooking(this.http, this.rootUrl, params, context);
  }

  /**
   * Choose Service and Book.
   *
   * This Api Is for Customer To choose The Service and Booked and Booked Notification sended in EMAIL to OWNER
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addBooking$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBooking(params: AddBooking$Params, context?: HttpContext): Observable<Bookings> {
    return this.addBooking$Response(params, context).pipe(
      map((r: StrictHttpResponse<Bookings>): Bookings => r.body)
    );
  }

  /** Path part for operation `getAllServices()` */
  static readonly GetAllServicesPath = '/api/customers/services';

  /**
   * All Services.
   *
   * This Api Showing  All Services Available To The User
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllServices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllServices$Response(params?: GetAllServices$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CustomerServiceResponse>>> {
    return getAllServices(this.http, this.rootUrl, params, context);
  }

  /**
   * All Services.
   *
   * This Api Showing  All Services Available To The User
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllServices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllServices(params?: GetAllServices$Params, context?: HttpContext): Observable<Array<CustomerServiceResponse>> {
    return this.getAllServices$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CustomerServiceResponse>>): Array<CustomerServiceResponse> => r.body)
    );
  }

  /** Path part for operation `getAllBookings()` */
  static readonly GetAllBookingsPath = '/api/customers/booking-status';

  /**
   * Booked Status.
   *
   * This Api Shows Current status Of booking
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBookings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings$Response(params?: GetAllBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingResponse>>> {
    return getAllBookings(this.http, this.rootUrl, params, context);
  }

  /**
   * Booked Status.
   *
   * This Api Shows Current status Of booking
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBookings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings(params?: GetAllBookings$Params, context?: HttpContext): Observable<Array<BookingResponse>> {
    return this.getAllBookings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingResponse>>): Array<BookingResponse> => r.body)
    );
  }

}
