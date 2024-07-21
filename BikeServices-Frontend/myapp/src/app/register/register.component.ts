import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../token/token.service";
import {Ownersignupdto} from "../services/models/ownersignupdto";
import {AuthControllerService} from "../services/services/auth-controller.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
enableError = false;

    constructor(
      private setRegister:AuthControllerService,
      private router:Router,
      private token:TokenService,
    ) {}

    signupForm = new FormGroup({
      name: new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]{4,19}$")]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      phoneNumber:new FormControl(null,[Validators.required,Validators.pattern("^[789]\\d{9}$")      ]),
      address:new FormControl(null,[Validators.required])
    })


  signup(){
      if(this.signupForm.valid){
      this.setRegister.setOwnerSignup(
        {
          body:this.signupForm.value as Ownersignupdto
        }).subscribe({
        next: (res) => {
          alert("Account Created Succesfully")
           this.router.navigate(['/login'])
        }
      })
    }
  }
}


