import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  private _user: Observable<firebase.User>;
  public currentAuth: Object;

  constructor(private _afAuth: AngularFireAuth, private _router: Router) {
    this._user = this._afAuth.authState;
  }

  public register(email: string, password: string): void {
    this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.warn("created", response);
        this._router.navigate(["/"]);
      })
      .catch((error: firebase.FirebaseError) => {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;

        switch (errorCode) {
          case "auth/email-already-in-use":
            console.error("Email already in use.", errorMessage);
            break;
          case "auth/invalid-email":
            console.error("Not a valid email address.", errorMessage);
            break;
          case "auth/weak-password":
            console.error("Password should have more characters.", errorMessage);
            break;
          default:
            console.error("Registration failed.", errorMessage);
        }
      });
  }

  public login(email: string, password: string): void {
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
          console.warn("response", response);
          this._user.subscribe(u => {
            this.currentAuth = u;
            this._router.navigate(["/"]);
          });
        })
      .catch((error: firebase.FirebaseError) => {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;

        switch (errorCode) {
          case "auth/user-disabled":
            console.error("This account has been disabled.", errorMessage);
            break;
          case "auth/invalid-email":
            console.error("Not a valid email address.", errorMessage);
            break;
          case "auth/user-not-found":
            console.error("User not found.", errorMessage);
            break;
          case "auth/wrong-password":
            console.error("Password is invalid.", errorMessage);
            break;
          default:
            console.error("Log in attempt failed.", errorMessage);
        }
        });
  }

  public logout(): void {
    this._afAuth.auth.signOut();
    this.currentAuth = null;
  }
}
