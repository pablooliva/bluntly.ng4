import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertModule } from "ngx-bootstrap/alert";

import { AlertsComponent } from "./alerts.component";

@NgModule({
  declarations: [
    AlertsComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [
    AlertsComponent
  ]
})
export class SharedModule {
}
