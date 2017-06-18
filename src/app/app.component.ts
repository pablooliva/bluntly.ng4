import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import '../assets/css/bootstrap4.css';
import '../assets/css/glyphicons.css';
import '../assets/css/styles.scss';

@Component({
  selector: 'blnt-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public navCollapsed: boolean;
  public currentAuth: Object;
  public user: Observable<firebase.User>;
  public items: FirebaseListObservable<any[]>;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
  }

  public ngOnInit(): void {
    this.navCollapsed = true;
    this.user = this.afAuth.authState;
    this.items = this.afDb.list('items');

    this.login();
  }
  /*$rootScope.currentAuth = null;
  $scope.navCollapsed = true;

  Authentication.$onAuthStateChanged(function(firebaseUser) {
    $rootScope.currentAuth = firebaseUser || null;
  });

  $rootScope.$on('$stateChangeSuccess', function(){
    const isHome = $state.is('home'),
      logoCont = angular.element(document.getElementById('blnt-logo')),
      logoElem = '<a href="/"><img class="blnt-logo" alt="b.luntly home" src="images/b.luntly-logo.svg"></a>';

    if (isHome){
      logoCont.html('');
    } else {
      logoCont.html(logoElem);
    }
  });*/

  public login(): void {
    this.afAuth.auth.signInWithEmailAndPassword('pablo@qecept.com', '123456');
    this.user.subscribe(u => {
      this.currentAuth = u;
    });

  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }
}
