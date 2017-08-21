import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollapseModule } from "ngx-bootstrap";

import { AppRoutingModule } from "../app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CollapseModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule {
}
