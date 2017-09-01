import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {AlertGuardService} from "./shared/alert-guard.service";
import { HomeComponent } from "./core/home/home.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";

const appRoutes: Routes = [
  {path: "", canActivate: [ AlertGuardService ], component: HomeComponent},
  {path: "not-found", canActivate: [ AlertGuardService ], component: NotFoundComponent},
  {path: "users", loadChildren: "./users/users.module#UsersModule"},
  {path: "**", redirectTo: "not-found"}
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
