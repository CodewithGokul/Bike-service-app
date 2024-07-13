import { Component } from '@angular/core';
import {AuthControllerService} from "../services/services/auth-controller.service";
import {Route, Router} from "@angular/router";
import {Customerlogindto} from "../services/models/customerlogindto";
import {TokenService} from "../token/token.service";
import {navshareService} from "../sharedservice/navshare.service";

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent {

  setInvalid: boolean = false;
  constructor(
    private authRequest:AuthControllerService,
   private router:Router,
    private token:TokenService,
    private role:navshareService
  ) {}
    userLogin:Customerlogindto={
    'email':'',
      'password':''
    }
    login(){

      this.authRequest.setCustomerlogin({
        body:this.userLogin
      }).subscribe({
        next:(response)=>{
          this.token.token = response.token as string;
          this.role.setRole("customer")
        this.router.navigate(['/','allservices']).then()
        },
        error:(error)=>{
          this.setInvalid = true;
        }
      })
    }

}
