import { Component } from '@angular/core';

@Component({
  selector: 'blnt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  /*$scope.login = function() {
    Alerts.closeAlert('login');
    $state.go('login');
    Authentication.$signInWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function() {
        $state.go('ask');
      })
      .catch(function() {
        Alerts.addAlert({ type: 'danger', msg: 'Login attempt failed.', source: 'login' });
        $state.go('.alerts');
      });
  };*/

  /*$scope.login = function() {
    Alerts.closeAlert('login');

    Authentication.$signInWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function() {
        Alerts.addAlert({ type: 'success', msg: 'You are now logged in.', source: 'login' });
        $state.go('^.alerts');
      })
      .catch(function() {
        Alerts.addAlert({ type: 'danger', msg: 'Login attempt failed.', source: 'login' });
        $state.go('^.alerts');
      });
  };*/
}