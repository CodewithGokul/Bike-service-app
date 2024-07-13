import { Component } from '@angular/core';
import {AuthControllerService} from "../services/services/auth-controller.service";
import {Router} from "@angular/router";
import {Customersignupdto} from "../services/models/customersignupdto";
import {TokenService} from "../token/token.service";

@Component({
  selector: 'app-useregister',
  templateUrl: './useregister.component.html',
  styleUrl: './useregister.component.css'
})
export class UseregisterComponent {

  constructor(
    private authService:AuthControllerService,
    private router:Router,
    private token:TokenService,
  ) {
  }
  authRequest:Customersignupdto = {
    'email':'',
    'name':'',
    'password':'',
    'phoneNumber':''
  }

  signup(){
        this.authService.setCustomerSignup({
          body:this.authRequest
        }).subscribe({
          next:(response)=>{
            this.router.navigate(['/','userlogin']).then()
          }
        })
  }
}
