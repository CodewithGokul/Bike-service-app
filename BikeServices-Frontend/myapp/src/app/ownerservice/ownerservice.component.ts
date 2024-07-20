import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnersControllerService } from '../services/services/owners-controller.service';
import { BikeServices } from '../services/models/bike-services';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {addServices} from "../services/fn/owners-controller/add-services";
import {OwnerserviceService} from "./ownerservice.service";
import {StrictHttpResponse} from "../services/strict-http-response";
import {editServices} from "../services/fn/owners-controller/edit-services";
import {Servicesdto} from "../services/models/servicesdto";
import {AuthControllerService} from "../services/services/auth-controller.service";

@Component({
  selector: 'app-ownerservice',
  templateUrl: './ownerservice.component.html',
  styleUrls: ['./ownerservice.component.css']
})
export class OwnerserviceComponent implements OnInit {

  bikeService: BikeServices[] = [];
  private editService:Servicesdto={
    'charges':0,
    'servicename':'',
    'description':'',
    'location':''
  }
   updateService:BikeServices = {};
  constructor(
    private router: Router,
    private authRequest: OwnerserviceService,

  ) {}

  ngOnInit() {
    this.fetchBikeService();

  }

  logout() {
    this.authRequest.logout();
    }
  fetchBikeService() {
   this.authRequest.displayService().subscribe({
     next:(res)=>{
      this.bikeService = res as BikeServices[];

     }
   })

  }



  delete(serviceId:number|any){
    console.log(serviceId)
    this.authRequest.deleteService(serviceId).subscribe({
      next: (response):any => {
        alert(response)
        this.bikeService = this.bikeService.filter(service => service.id !== serviceId);
        this.fetchBikeService();
      },
      error: (error: any) => {
        console.error('Error deleting service:', error);
      }
    });
}

  enableEdit: boolean = false;

  editservice(service:BikeServices) {
    this.updateService = service;
    console.log(
      this.updateService.serviceName
    )
    this.enableEdit = true;
  }
}
