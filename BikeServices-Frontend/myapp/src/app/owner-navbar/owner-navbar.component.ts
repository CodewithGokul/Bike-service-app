  import { Component } from '@angular/core';
  import {LoginComponent} from "../login/login.component";

  @Component({
    selector: 'app-owner-navbar',
    templateUrl: './owner-navbar.component.html',
    styleUrl: './owner-navbar.component.css'
  })
  export class OwnerNavbarComponent {
    constructor(
      private role:LoginComponent
    ) {}

  }
