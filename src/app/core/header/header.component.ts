import { Component, DoCheck, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../shared/auth.service";

@Component({
  selector: "blnt-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, DoCheck {
  public isCollapsed: boolean = false;
  public currentAuth: Object;

  constructor(private _authService: AuthService, private _router: Router) {}

  public ngOnInit(): void {
    this.isCollapsed = true;
  }

  public ngDoCheck(): void {
    this.currentAuth = this._authService.currentAuth;
  }

  public logout(): void {
    this._authService.logout();
    this._router.navigate(["/"]);
  }
}
