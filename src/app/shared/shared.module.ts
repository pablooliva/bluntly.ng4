import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertModule } from "ngx-bootstrap/alert";

import { AlertsComponent } from "./alerts/alerts.component";
import {FormValidationMessagesComponent} from "./validation/form-validation-messages.component";

@NgModule({
  declarations: [
    AlertsComponent,
    FormValidationMessagesComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [
    AlertsComponent,
    FormValidationMessagesComponent
  ]
})
export class SharedModule {
}
