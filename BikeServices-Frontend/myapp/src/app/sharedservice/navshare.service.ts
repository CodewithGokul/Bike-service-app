import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class navshareService {
role:string=''
  setRole(role: string): void {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }
}
