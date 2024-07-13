import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage or sessionStorage
    const token = localStorage.getItem('token'); // Or sessionStorage.getItem('token');

    // Check if the request URL contains '/auth/login' to bypass adding token
    if (req.url.includes('http://localhost:8080/api/auth/owner/login')) {
      console.log("logged")
      return next.handle(req); // Skip adding Authorization header for login endpoint
    }
    if (req.url.includes('http://localhost:8080/api/auth/owner/signup')) {
      console.log("logged")
      return next.handle(req); // Skip adding Authorization header for login endpoint
    }
    if (req.url.includes('http://localhost:8080/api/auth/customer/login')) {
      console.log("logged")
      return next.handle(req); // Skip adding Authorization header for login endpoint
    }
    if (req.url.includes('http://localhost:8080/api/auth/customer/signup')) {
      console.log("logged")
      return next.handle(req); // Skip adding Authorization header for login endpoint
    }

    // Clone the request and add the Authorization header if token exists
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the request on to the next handler
    return next.handle(req);
  }
}
