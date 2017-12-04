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
    data: {
      title: "b.luntly users",
      description: "User options for managing your questions and details shared."
    }
  },
  {
    path: "login",
    canActivate: [ AlertGuardService ],
    component: LoginComponent,
    data: {
      title: "b.luntly log in",
      description: "Log in to your b.luntly user account to create and share questions, and review the answers."
    }
  },
  {
    path: "register",
    canActivate: [ AlertGuardService ],
    component: RegisterComponent,
    data: {
      title: "b.luntly register",
      description: "Register for a b.luntly user account to begin creating questions to share."
    }
  },
  {
    path: "bio",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: BioComponent,
    data: {
      title: "b.luntly user bio",
      description: "Create and manage user profiles that can be shared with those that answer your questions."
    }
  },
  {
    path: "bioCreate",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: BioCreateComponent,
    data: {
      title: "b.luntly create a user bio",
      description: "Create user profiles to share with those that answers your questions."
    }
  },
  {
    path: "bioEdit/:bioId",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: BioEditComponent,
    data: {
      title: "b.luntly edit a user bio",
      description: "Manage user profiles that are shared with those that answers your questions."
    }
  },
  {
    path: "ask",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: AskComponent,
    data: {
      title: "b.luntly user questions",
      description: "Create and share sets of questions that can be answered anonymously."
    }
  },
  {
    path: "answers",
    canActivate: [ AlertGuardService, AuthGuardService ],
    component: AnswersComponent,
    data: {
      title: "b.luntly get answers",
      description: "Get anonymous answers to your questions. Review the honest responses."
    }
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
