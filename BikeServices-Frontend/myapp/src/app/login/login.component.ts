import { Component } from '@angular/core';
import { Ownerlogindto } from '../services/models/ownerlogindto';
import { AuthControllerService } from '../services/services/auth-controller.service';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import {LoginService} from "./login.service";
import {navshareService} from "../sharedservice/navshare.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  setInvalid:boolean = false
  constructor(
    private router: Router,
    private setLogin: AuthControllerService,
    private token: TokenService,
    private role:navshareService
  ) {}

  authRequest: Ownerlogindto = { email: '', password: '' };

  login() {
    this.setLogin.setOwnerlogin({ body: this.authRequest }).subscribe({
      next: (response: any) => {
        // Handle response here
        if (response && response.token) {
          console.log("new" + response)
          this.token.token = response.token; // Assuming 'token' is directly accessible in the response
          this.role.setRole('customer');
          this.router.navigate(['/', 'service']).then()
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error: any) => {
        this.setInvalid = true
        console.error('Login Error:', error);
      }
    });
  }
}
