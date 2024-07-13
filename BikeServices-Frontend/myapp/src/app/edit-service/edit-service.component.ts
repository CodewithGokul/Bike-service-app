// edit-service.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Servicesdto} from "../services/models/servicesdto";
import {EditServiceService} from "./edit-service.service";
import {editServices} from "../services/fn/owners-controller/edit-services";
import {BikeServices} from "../services/models/bike-services";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent {
  constructor(
    private editService:EditServiceService
  ) {
  }

  @Input() service!: BikeServices;
  @Output() closepop = new EventEmitter();

  onSubmit(services:BikeServices) {
        this.editService.editService(services.id, services).subscribe({
          next: () => { this.closepop.emit(); }
        })
  }

  close(){
    this.closepop.emit()
}
}
