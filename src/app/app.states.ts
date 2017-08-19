import { Ng2StateDeclaration } from "@uirouter/angular";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./account/login.component";

export const appState: Ng2StateDeclaration = {
  name: "app",
  redirectTo: "home",
  component: AppComponent
};

export const homeState: Ng2StateDeclaration = {
  parent: "app",
  name: "home",
  url: "/home",
  component: HomeComponent
};

export const loginState: Ng2StateDeclaration = {
  parent: "app",
  name: "login",
  url: "/login",
  component: LoginComponent
};

export const APP_STATES: Ng2StateDeclaration[] = [
  appState,
  homeState,
  loginState
];
