import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Use Router instead of Route
import { OwnersControllerService } from '../services/services/owners-controller.service';
import { BikeServices } from '../services/models/bike-services';
import {Servicesdto} from "../services/models/servicesdto";
import {AddserviceService} from "./addservice.service";

@Component({
  selector: 'app-addservices',
  templateUrl: './addservices.component.html',
  styleUrls: ['./addservices.component.css'] // Corrected typo here
})
export class AddservicesComponent {

  constructor(
    private router: Router, // Use Router instead of Route
    private authRequest:AddserviceService
  ) {}

  setService:Servicesdto = {
    'servicename':'',
    'charges':undefined,
    'description':'',
    'location':''
  }

  addservice() {
    this.authRequest.addService(this.setService).subscribe(() => {

      this.router.navigate(['service']).then() // Navigate to services after adding service
    });
  }
}
