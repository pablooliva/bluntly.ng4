import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { AuthService } from "../../shared/auth.service";
import { AFUtils } from "../../shared/utils";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "blnt-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.scss"]
})
export class AnswersComponent implements OnInit, OnDestroy {
  public loaded: boolean;
  public questionSets: any[];
  public questionSetsObs: FirebaseListObservable<any[]>;
  public haveQuestions: boolean;
  public displaySet: any;
  public questionKeys: string[];
  public answers: Object;
  public haveAnswers: Object;
  public questionRef: Object;
  public userId: string;

  private _questionsSubscription: Subscription;
  private _answersSubscription: Subscription[];

  public constructor(
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils
  ) {}

  public ngOnInit(): void {
    this.loaded = false;
    this.answers = {};
    this.questionRef = {};
    this.haveQuestions = false;
    this.haveAnswers = {};
    this.userId = this._authService.currentUser["uid"];
    const questionsPath: string = this._afUtils.afPathMaker(["questions", this.userId]);
    this.questionSetsObs = this._db.list(questionsPath);

    this._questionsSubscription = this.questionSetsObs.subscribe(records => {
      this.loaded = true;
      if (records.length) {
        this.haveQuestions = true;
      }
      this.questionSets = records;
    });

    this._answersSubscription = [];
  }

  public ngOnDestroy(): void {
    if (this._questionsSubscription) {
      this._questionsSubscription.unsubscribe();
    }
    if (this._answersSubscription) {
      this._answersSubscription.forEach(sub => sub.unsubscribe());
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
    const ansIndSubscription: Subscription = answersSet.subscribe(records => {
      if (records.length) {
        this.haveAnswers[answersId] = true;
      }
      this.answers[answersId] = records;
    });
    this.questionRef[answersId] = answersId;
    this._answersSubscription.push(ansIndSubscription);
  }
}