import { Component } from "@angular/core";

@Component({
  selector: "blnt-questions",
  templateUrl: "./answers.component.html"
})
export class QuestionsComponent {
  /*const qRef = firebase.database().ref().child('questions').child($stateParams.user).child($stateParams.qSet).child('setQuestions');

  $scope.questionSet = $firebaseArray(qRef);
  $scope.answer = {};
  $scope.btnDisabled = true;

  $scope.btnStatus = function(){
    let btnDisabled = true;
    Object.keys($scope.answer).forEach(prop => {
      if ($scope.answer[prop].trim()){
        btnDisabled = false;
      }
    });
    $scope.btnDisabled = btnDisabled;
  };

  function displayAlert(alertObj){
    Alerts.addAlert({ type: alertObj.type, msg: alertObj.msg, source: 'questionSet' });
    $state.go('.alerts');
  }

  function rollbackSave(ansKey1, ansKey2){
    if (ansKey2.length > 0){
      ansKey2.forEach(function(item, idx){
        firebase.database().ref('answers/' + ansKey1[idx] + '/' + item).remove();
      });
    }

    displayAlert({
      type: 'danger',
      msg: 'An error occurred and the answers were not saved. Please try again.'
    });
  }

  function displayBio(){
    firebase.database().ref('questions/' + $stateParams.user + '/' + $stateParams.qSet).once('value')
      .then(function(data) {
        const bioKey = data.val().setBio,
          bioRef = firebase.database().ref().child('bios').child($stateParams.user).child(bioKey);

        $scope.bio = $firebaseObject(bioRef);
      });
  }

  function setAnswers(answersArr){
    let pAnswersArr = answersArr,
      rollbackArr = [];

    function setAnswersIterator(idx){
      const qID = pAnswersArr[idx],
        newKey = firebase.database().ref('answers/' + qID).push().key,
        answerItem = {
          timeSubmitted: firebase.database.ServerValue.TIMESTAMP,
          answer: $scope.answer[qID]
        };

      if (idx >= pAnswersArr.length){
        displayAlert({
          type: 'success',
          msg: 'Your answers have been saved. Thank you!'
        });

        $scope.answersSubmitted = true;
        $scope.answer = {};
        $scope.answerQForm.$setUntouched();
        $scope.answerQForm.$setPristine();
        $scope.btnDisabled = true;
        displayBio();
      } else {
        firebase.database().ref('answers/' + qID + '/' + newKey).set(answerItem)
          .then(function(){
            rollbackArr.push(newKey);
            setAnswersIterator(idx + 1);
          })
          .catch(function(){
            rollbackSave(answersArr, rollbackArr);
          });
      }
    }

    setAnswersIterator(0);
  }

  $scope.saveAnswers = function(){
    let answersArr = [];

    Alerts.closeAlert('questionSet');
    $state.go('questionSet');

    if (Object.keys($scope.answer).length === 0){
      $scope.btnDisabled = true;

      displayAlert({
        type: 'danger',
        msg: 'No answers were given.'
      });
    } else {
      Object.keys($scope.answer).forEach(qID => {
        if ($scope.answer[qID].trim() !== ''){
          answersArr.push(qID);
        }
      });

      if (answersArr.length > 0){
        setAnswers(answersArr);
      }
    }
  };*/
}