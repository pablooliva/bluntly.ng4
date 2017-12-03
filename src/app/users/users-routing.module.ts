import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlertGuardService } from "../shared/alerts/alert-guard.service";
import { AuthGuardService } from "../shared/auth-guard.service";
import { UsersComponent } from "./users.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { BioComponent } from "./bio/bio.component";
import { BioCreateComponent } from "./bio/create/bio-create.component";
import { BioEditComponent } from "./bio/edit/bio-edit.component";
import { AskComponent } from "./questions/ask.component";
import { AnswersComponent } from "./answers/answers.component";

const userRoutes: Routes = [
  {
    path: "",
    canActivate: [ AlertGuardService ],
    component: UsersComponent,
    data: { title: "b.luntly users" }
  },
  {
    path: "login",
    canActivate: [ AlertGuardService ],
    component: LoginComponent,
    data: { title: "b.luntly log in" }
  },
  {
    path: "register",
    canActivate: [ AlertGuardService ],
    component: RegisterComponent,
    data: { title: "b.luntly register" }
  },
  {
    path: "bio",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: BioComponent,
    data: { title: "b.luntly user bio" }
  },
  {
    path: "bioCreate",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: BioCreateComponent,
    data: { title: "b.luntly create a user bio" }
  },
  {
    path: "bioEdit/:bioId",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: BioEditComponent,
    data: { title: "b.luntly edit a user bio" }
  },
  {
    path: "ask",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: AskComponent,
    data: { title: "b.luntly user questions" }
  },
  {
    path: "answers",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: AnswersComponent,
    data: { title: "b.luntly get answers" }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {
}
