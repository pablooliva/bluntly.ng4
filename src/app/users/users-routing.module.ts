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
  {path: "", canActivate: [ AlertGuardService ], component: UsersComponent},
  {path: "login", canActivate: [ AlertGuardService ], component: LoginComponent},
  {path: "register", canActivate: [ AlertGuardService ], component: RegisterComponent},
  {path: "bio", canActivate: [ AlertGuardService, AuthGuardService ], component: BioComponent},
  {path: "bioCreate", canActivate: [ AlertGuardService, AuthGuardService ], component: BioCreateComponent},
  {path: "bioEdit/:bioId", canActivate: [ AlertGuardService, AuthGuardService ], component: BioEditComponent},
  {path: "ask", canActivate: [ AlertGuardService, AuthGuardService ], component: AskComponent},
  {path: "answers", canActivate: [ AlertGuardService, AuthGuardService ], component: AnswersComponent}
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
