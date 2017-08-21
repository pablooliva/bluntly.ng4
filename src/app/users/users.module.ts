import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "../app-routing.module";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { BioEditComponent } from "./bio/bio-edit.component";
import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    BioEditComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
}
