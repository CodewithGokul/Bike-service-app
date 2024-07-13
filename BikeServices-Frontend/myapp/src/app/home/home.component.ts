import { Component } from '@angular/core';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    protected readonly LoginComponent = LoginComponent;
}
