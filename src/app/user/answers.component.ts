import { Component } from '@angular/core';

@Component({
  selector: 'blnt-answers',
  templateUrl: './answers.component.html'
})
export class AnswersComponent {
  /*let userID = null,
  questionSetsArr = [];

  $scope.showSets = true;
  $scope.hasAuth = false;

  $rootScope.$watch('currentAuth', function(){
    if ($rootScope.currentAuth){
      userID = $rootScope.currentAuth.uid;
      const qSetRef = firebase.database().ref().child('questions').child(userID);

      $scope.questionSets = $firebaseArray(qSetRef);
      $scope.hasAuth = true;
    } else {
      $scope.hasAuth = false;
    }
  });

  $scope.$watch('questionSets', function(){
    questionSetsArr = $scope.questionSets;
  });

  $scope.showSetList = function() {
    $scope.showSets = true;
    $scope.showIndAns = false;
  };

  $scope.showIndSet = function(key) {
    let thisSetQs = {};
    $scope.showSets = false;

    questionSetsArr.forEach(function(item){
      if (item.$id === key){
        $scope.setTitle = item.setName;
        thisSetQs = item.setQuestions;
      }
    });

    $scope.setQuestions = thisSetQs;
  };

  $scope.showIndQuestion = function(key) {
    $scope.showIndAns = true;
    const qSetRef = firebase.database().ref().child('answers').child(key);
    $scope.indQuestion = $firebaseArray(qSetRef);
  };*/
}