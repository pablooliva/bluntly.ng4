import { Component } from '@angular/core';

@Component({
  selector: 'blnt-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  /*$scope.register = function() {
    let attempts = 0;

    function userNotCreated(error){
      Alerts.addAlert({ type: 'danger', msg: 'Could not create new account. ' + error, source: 'register' });
      $state.go('.alerts');
    }

    function retryDelete(error){
      $timeout(function(){
        Authentication.$deleteUser()
          .then(function(){
            userNotCreated(error);
          })
          .catch(function(error){
            if (attempts < 3){
              attempts++;
              retryDelete(error);
            }
            userNotCreated(error);
          });
      }, 1000);
    }

    Alerts.closeAlert('register');
    $state.go('register');

    Authentication.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
      .then(function(firebaseUser) {
        const newUserData = {
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          name: '',
          email: firebaseUser.email
        };

        firebase.database().ref('users/' + firebaseUser.uid).set(newUserData)
          .then(function(){
            Object.keys($scope.user).forEach(prop => $scope.user[prop] = '');
            $scope.registerForm.$setUntouched();
            $scope.registerForm.$setPristine();

            Alerts.addAlert({ type: 'success', msg: 'Welcome ' + firebaseUser.email + '! You are now logged in.', source: 'register' });
            $state.go('.alerts');
          })
          .catch(function(error){
            Authentication.$deleteUser()
              .then(function(){
                userNotCreated(error);
              })
              .catch(function(error){
                retryDelete(error);
              });
          });
      })
      .catch(function(error) {
        userNotCreated(error);
      });
  };*/
}