import {Component, OnInit} from '@angular/core';
import {navshareService} from "./sharedservice/navshare.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'myapp';
  role:string = ''
  constructor(
    private Role:navshareService
  ) {
  }

  ngOnInit(): void {
    this.setRole()
  }

  setRole(){
    this.role = this.Role.getRole()
    console.log(this.role)
  }
}
