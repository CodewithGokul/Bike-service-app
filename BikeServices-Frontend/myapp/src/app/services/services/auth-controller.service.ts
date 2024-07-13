/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Customers } from '../models/customers';
import { setCustomerlogin } from '../fn/auth-controller/set-customerlogin';
import { SetCustomerlogin$Params } from '../fn/auth-controller/set-customerlogin';
import { setCustomerSignup } from '../fn/auth-controller/set-customer-signup';
import { SetCustomerSignup$Params } from '../fn/auth-controller/set-customer-signup';
import { setOwnerlogin } from '../fn/auth-controller/set-ownerlogin';
import { SetOwnerlogin$Params } from '../fn/auth-controller/set-ownerlogin';
import { setOwnerSignup } from '../fn/auth-controller/set-owner-signup';
import { SetOwnerSignup$Params } from '../fn/auth-controller/set-owner-signup';
import { TokenResponse } from '../models/token-response';

@Injectable({ providedIn: 'root' })
export class AuthControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setOwnerSignup()` */
  static readonly SetOwnerSignupPath = '/api/auth/owner/signup';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setOwnerSignup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setOwnerSignup$Response(params: SetOwnerSignup$Params, context?: HttpContext): Observable<StrictHttpResponse<TokenResponse>> {
    return setOwnerSignup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setOwnerSignup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setOwnerSignup(params: SetOwnerSignup$Params, context?: HttpContext): Observable<TokenResponse> {
    return this.setOwnerSignup$Response(params, context).pipe(
      map((r: StrictHttpResponse<TokenResponse>): TokenResponse => r.body)
    );
  }

  /** Path part for operation `setOwnerlogin()` */
  static readonly SetOwnerloginPath = '/api/auth/owner/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setOwnerlogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setOwnerlogin$Response(params: SetOwnerlogin$Params, context?: HttpContext): Observable<StrictHttpResponse<TokenResponse>> {
    return setOwnerlogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setOwnerlogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setOwnerlogin(params: SetOwnerlogin$Params, context?: HttpContext): Observable<TokenResponse> {
    return this.setOwnerlogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<TokenResponse>): TokenResponse => r.body)
    );
  }

  /** Path part for operation `setCustomerSignup()` */
  static readonly SetCustomerSignupPath = '/api/auth/customer/signup';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setCustomerSignup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setCustomerSignup$Response(params: SetCustomerSignup$Params, context?: HttpContext): Observable<StrictHttpResponse<Customers>> {
    return setCustomerSignup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setCustomerSignup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setCustomerSignup(params: SetCustomerSignup$Params, context?: HttpContext): Observable<Customers> {
    return this.setCustomerSignup$Response(params, context).pipe(
      map((r: StrictHttpResponse<Customers>): Customers => r.body)
    );
  }

  /** Path part for operation `setCustomerlogin()` */
  static readonly SetCustomerloginPath = '/api/auth/customer/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setCustomerlogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setCustomerlogin$Response(params: SetCustomerlogin$Params, context?: HttpContext): Observable<StrictHttpResponse<TokenResponse>> {
    return setCustomerlogin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setCustomerlogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setCustomerlogin(params: SetCustomerlogin$Params, context?: HttpContext): Observable<TokenResponse> {
    return this.setCustomerlogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<TokenResponse>): TokenResponse => r.body)
    );
  }

}
