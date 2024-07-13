import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {OwnerserviceComponent} from "./ownerservice/ownerservice.component";
import {AddservicesComponent} from "./addservices/addservices.component";
import {OwnerbookingComponent} from "./ownerbooking/ownerbooking.component";
import {UserloginComponent} from "./userlogin/userlogin.component";
import {UseregisterComponent} from "./useregister/useregister.component";
import {AllservicesComponent} from "./allservices/allservices.component";
import {CustomerbookingComponent} from "./customerbooking/customerbooking.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'service', component: OwnerserviceComponent},
  {path:'addservice',component:AddservicesComponent},
  {path:'ownerbooking', component: OwnerbookingComponent},
  {path:'userlogin', component: UserloginComponent},
  {path:'useregister', component: UseregisterComponent},
  {path:'allservices', component: AllservicesComponent},
  {path:'booking-status', component: CustomerbookingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
