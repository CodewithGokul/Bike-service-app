import { Component } from '@angular/core';
import {AuthControllerService} from "../services/services/auth-controller.service";
import {Router} from "@angular/router";
import {Customersignupdto} from "../services/models/customersignupdto";
import {TokenService} from "../token/token.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  enableError = false;

  signupForm = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]{4,19}$")]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
    phoneNumber:new FormControl(null,[Validators.required,Validators.pattern("^[789]\\d{9}$")      ]),
    address:new FormControl(null,[Validators.required])
  })

  signup(){
    if(this.signupForm.valid){

        this.authService.setCustomerSignup({
          body:this.signupForm.value as Customersignupdto
        }).subscribe({
          next:(response)=>{
            this.router.navigate(['/','userlogin']).then()
          }
        })
      }
  }


}
