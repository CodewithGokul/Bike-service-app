import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { OwnerserviceComponent } from './ownerservice/ownerservice.component';
import {AuthInterceptor} from "./auth.interceptor";
import { AddservicesComponent } from './addservices/addservices.component';
import { OwnerbookingComponent } from './ownerbooking/ownerbooking.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UseregisterComponent } from './useregister/useregister.component';
import { AllservicesComponent } from './allservices/allservices.component';
import { CustomerbookingComponent } from './customerbooking/customerbooking.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { CustomerNavbarComponent } from './customer-navbar/customer-navbar.component';
import { OwnerNavbarComponent } from './owner-navbar/owner-navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    OwnerserviceComponent,
    AddservicesComponent,
    OwnerbookingComponent,
    UserloginComponent,
    UseregisterComponent,
    AllservicesComponent,
    CustomerbookingComponent,
    EditServiceComponent,
    CustomerNavbarComponent,
    OwnerNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
