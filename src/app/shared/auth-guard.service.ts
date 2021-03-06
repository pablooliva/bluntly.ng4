import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  public canActivate(): boolean {
    if (!this._auth.isAuthenticated()) {
      this._router.navigate(["/users/register"]);
      return false;
    } else {
      return true;
    }
  }
}