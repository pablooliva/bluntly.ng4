import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { AuthService } from "../../shared/auth.service";
import { AFUtils } from "../../shared/utils";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "blnt-answers",
  templateUrl: "./answers.component.html"
})
export class AnswersComponent implements OnInit, OnDestroy {
  public questionSets: any[];
  public haveQuestions: boolean;
  public displaySet: any;
  public questionKeys: string[];
  public answers: any[];
  public haveAnswers: boolean;
  public questionRef: Object;

  private _questionsSubscription: Subscription;
  private _answersSubscription: Subscription;

  public userId: string;

  public constructor(
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils
  ) {}

  public ngOnInit(): void {
    this.questionRef = {};
    this.haveQuestions = false;
    this.haveAnswers = false;
    this.userId = this._authService.currentUser["uid"];
    const questionsPath: string = this._afUtils.afPathMaker(["questions", this.userId]);
    const questionSets: FirebaseListObservable<any[]> = this._db.list(questionsPath);

    this._questionsSubscription = questionSets.subscribe(records => {
      if (records.length) {
        this.haveQuestions = true;
      }
      this.questionSets = records;
    });
  }

  public ngOnDestroy(): void {
    if (this._questionsSubscription) {
      this._questionsSubscription.unsubscribe();
    }
    if (this._answersSubscription) {
      this._answersSubscription.unsubscribe();
    }
  }

  public displayQSet(setId: string): void {
    this.displaySet = this.questionSets.find(element => element.$key === setId);
    this.questionKeys = Object.keys(this.displaySet.questions);
    this.questionKeys = this.questionKeys.filter(item => this.displaySet.questions[item] !== "");
  }

  public displayAnswers(answersId: string): void {
    const answersPath: string = this._afUtils.afPathMaker(["answers", answersId]);
    const answersSet: FirebaseListObservable<any[]> = this._db.list(answersPath);

    this._answersSubscription = answersSet.subscribe(records => {
      if (records.length) {
        this.haveAnswers = true;
      }
      this.answers = records;
    });
    this.questionRef[answersId] = answersId;
  }
}