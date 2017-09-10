import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

import { AlertsService } from "./alerts/alerts.service";
import { BSAlertTypes } from "./alerts/alerts.component";

@Injectable()
export class AuthService {
  private _user: Observable<firebase.User>;
  public currentAuth: Object;

  constructor(private _afAuth: AngularFireAuth, private _alertsService: AlertsService, private _router: Router) {
    this._user = this._afAuth.authState;
  }

  public register(email: string, password: string): void {
    this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.setAlert(BSAlertTypes.success, true, "Your registration was successful. You may now log in.");
        this._router.navigate(["/users/login"]);
      })
      .catch((error: firebase.FirebaseError) => {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;
        let blntErrorMessage: string;

        switch (errorCode) {
          case "auth/email-already-in-use":
            blntErrorMessage = "Email already in use.";
            break;
          case "auth/invalid-email":
            blntErrorMessage = "Not a valid email address.";
            break;
          case "auth/weak-password":
            blntErrorMessage = "Password should have more characters.";
            break;
          default:
            blntErrorMessage = "Registration failed.";
        }

        this.setAlert(BSAlertTypes.danger, false, blntErrorMessage, errorMessage);
      });
  }

  public login(email: string, password: string): void {
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
          this._user.subscribe(u => {
            this.currentAuth = u;
            this._router.navigate(["/users"]);
          });
        })
      .catch((error: firebase.FirebaseError) => {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;
        let blntErrorMessage: string;

        switch (errorCode) {
          case "auth/user-disabled":
            blntErrorMessage = "This account has been disabled.";
            break;
          case "auth/invalid-email":
            blntErrorMessage = "Not a valid email address.";
            break;
          case "auth/user-not-found":
            blntErrorMessage = "User not found.";
            break;
          case "auth/wrong-password":
            blntErrorMessage = "Password is invalid.";
            break;
          default:
            blntErrorMessage = "Log in attempt failed.";
        }

        this.setAlert(BSAlertTypes.danger, false, blntErrorMessage, errorMessage);
      });
  }

  public logout(): void {
    this._afAuth.auth.signOut();
    this.currentAuth = null;
    this._router.navigate(["/"]);
  }

  private setAlert(type: BSAlertTypes, persistent: boolean, primaryMsg: string, secondaryMsg?: string): void {
    this._alertsService.addAlert({
      type: type,
      messagePrimary: primaryMsg,
      messageSecondary: secondaryMsg,
      persistent: persistent
    });
  }
}
