import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../token/token.service";
import {Ownersignupdto} from "../services/models/ownersignupdto";
import {AuthControllerService} from "../services/services/auth-controller.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    constructor(
      private setRegister:AuthControllerService,
      private router:Router,
      private token:TokenService,
    ) {}

  authRequest:Ownersignupdto = {
    address:'',
    email:'',
    name: '',
    password:'',
    phoneNumber:''
  }
  signup(){
      this.setRegister.setOwnerSignup(
        {
          body:this.authRequest
        }).subscribe({
        next: (res: Blob|any) => {
            res.text().then((text: string) => {
                try {
                  const jsonResponse = JSON.parse(text);
                  this.token.token = jsonResponse.token as string;
                  this.router.navigate(['service']);
                }
                catch (e){
                  console.error('Error parsing JSON:', e);
                }
            })
        }
      })
  }
}
