import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private _user: Observable<firebase.User>;
  public currentAuth: Object;

  constructor(private afAuth: AngularFireAuth) {
    this._user = this.afAuth.authState;
    this.login('pablo@qecept.com', '123456');
  }

  public isAuthenticated() {
    return this.currentAuth;
  }

  public login(username: string, password: string): void {
    this.afAuth.auth.signInWithEmailAndPassword(username, password);
    this._user.subscribe(u => {
      this.currentAuth = u;
      console.warn(this.currentAuth);
    });
  }

  public logout(): void {
    this.afAuth.auth.signOut();
    this.currentAuth = null;
  }
}
