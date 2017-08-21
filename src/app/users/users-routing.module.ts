import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import { BioEditComponent } from "./bio/bio-edit.component";

const userRoutes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "bioEdit", component: BioEditComponent}
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
