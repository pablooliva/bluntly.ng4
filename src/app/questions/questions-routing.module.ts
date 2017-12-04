import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlertGuardService } from "../shared/alerts/alert-guard.service";
import { QuestionsComponent } from "./questions.component";

const questionsRoutes: Routes = [
  {
    path: "",
    canActivate: [ AlertGuardService ],
    component: QuestionsComponent,
    data: {
      title: "b.luntly answer questions anonymously",
      description: "Answer questions anonymously and honestly. A chance to provide honest and constructive feedback."
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(questionsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionsRoutingModule {
}
