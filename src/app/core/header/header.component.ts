import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";

import { AuthService } from "../../shared/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "blnt-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isCollapsed: boolean = false;
  public currentUser: firebase.User;

  private _userSubscription: Subscription;

  constructor(private _authService: AuthService, private _router: Router) {}

  public ngOnInit(): void {
    this.isCollapsed = true;
    this._userSubscription = this._authService.currentUserSubject.subscribe(user => {
      this.currentUser = user;
    });
  }

  public ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  public logout(): void {
    this._authService.logout();
    this._router.navigate(["/"]);
  }
}
