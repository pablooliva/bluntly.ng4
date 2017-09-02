import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AlertGuardService} from "../shared/alerts/alert-guard.service";
import {UsersComponent} from "./users.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import { BioEditComponent } from "./bio/bio-edit.component";

const userRoutes: Routes = [
  {path: "", canActivate: [ AlertGuardService ], component: UsersComponent},
  {path: "login", canActivate: [ AlertGuardService ], component: LoginComponent},
  {path: "register", canActivate: [ AlertGuardService ], component: RegisterComponent},
  {path: "bio", canActivate: [ AlertGuardService ], component: BioEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {}
