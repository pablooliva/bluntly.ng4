import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AlertGuardService} from "./shared/alerts/alert-guard.service";
import { HomeComponent } from "./core/home/home.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";

const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    canActivate: [ AlertGuardService ],
    component: HomeComponent,
    data: {
      title: "b.luntly - honest (blunt) & anonymous answers",
      description: "Get anonymous and honest answers to your personal questions."
    }
  },
  {
    path: "not-found",
    canActivate: [ AlertGuardService ],
    component: NotFoundComponent,
    data: {
      title: "page not found",
      description: "Sorry. The page that you are searching for was not found."
    }
  },
  {
    path: "users",
    loadChildren: "./users/users.module#UsersModule"
  },
  {
    path: "q/:user/:qid",
    loadChildren: "./questions/questions.module#QuestionsModule"
  },
  {
    path: "**", redirectTo: "not-found"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
