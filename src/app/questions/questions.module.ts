import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { QuestionsRoutingModule } from "./questions-routing.module";
import { SharedModule } from "../shared/shared.module";
import { QuestionsComponent } from "./questions.component";

@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuestionsModule {
}
