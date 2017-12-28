import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";

import { AFUtils } from "../shared/utils";
import { atLeastOneRequired } from "../shared/validation/custom.validators";
import { ControlType } from "../shared/validation/form-validation-messages.component";
import { AlertsService } from "../shared/alerts/alerts.service";
import { BSAlertTypes } from "../shared/alerts/alerts.component";
import { IGeoLocation, SourceService } from "../shared/source.service";
import { DataStoreService } from "../shared/data-store.service";

@Component({
  selector: "blnt-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"]
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public loaded: boolean;
  public questions: Object;
  public qKeys: string[];
  public qForm: FormGroup;
  public controlValidation: Object = {};
  public successfulSub: boolean;
  public bio: FirebaseListObservable<any>;
  public hasBio: boolean;

  private _userId: string;
  private _bioId: string;
  private _questionsSubscription: Subscription;
  private _bioSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils,
    private _alertsService: AlertsService,
    private _sourceService: SourceService,
    private _dataStore: DataStoreService,
    public fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.loaded = false;
    this.successfulSub = false;
    this.hasBio = false;
    this._userId = this._route.snapshot.params["user"];
    
    const questionsId: string = this._route.snapshot.params["qid"];
    const recordPath: string = this._afUtils.afPathMaker(["questions", this._userId, questionsId]);
    const questions: FirebaseObjectObservable<any> = this._db.object(recordPath);
    const qDynamicForm: Object = {};
    this.qForm = this.fb.group({});

    this._questionsSubscription = questions.subscribe(record => {
      this.loaded = true;
      if ("$value" in record && record.$value === null) {
        this._alertsService.addAlert({
          type: BSAlertTypes.danger,
          messagePrimary: "Are you sure you are using a valid link? We could not find any questions for this link.",
          persistent: false
        });

      } else if (record.active) {
        this._bioId = record.bio;
        this.questions = record.questions;
        this.qKeys = Object.keys(this.questions);

        this.qKeys.forEach(key => {
          const elemValue: string[] = [];
          elemValue.push("");
          qDynamicForm[key] = elemValue;
        });

        this.qForm = this.fb.group(qDynamicForm, {validator: atLeastOneRequired()});

        let message: string = record.length === 1
          ? "Please provide an"
          : "Please provide at least one (1)";

        message += " answer.";

        this.controlValidation["group"] = {
          control: this.qForm,
          type: ControlType[ControlType.group],
          message: {groupValidation: message}
        };

      } else {
        this._alertsService.addAlert({
          type: BSAlertTypes.danger,
          messagePrimary: "Sorry. These questions are no longer active.",
          persistent: false
        });
      }
    });
  }

  public ngOnDestroy(): void {
    if (this._questionsSubscription) {
      this._questionsSubscription.unsubscribe();
    }
    if (this._bioSubscription) {
      this._bioSubscription.unsubscribe();
    }
  }

  public anonCreateQuestions(): void {
    this._router.navigate(["/users/ask"]);
  }

  public onSubmit(): void {
    if (this._isSameUser()) {
      this._alertsService.addAlert({
        type: BSAlertTypes.danger,
        messagePrimary: "Answers were not saved. Answering your own questions is prohibited.",
        persistent: false
      });

      this.qForm.reset();
      this.successfulSub = true;
      window.scroll({ top: 0, left: 0, behavior: "smooth" });

      const bioPath: string = this._afUtils.afPathMaker(["bios", this._userId, this._bioId]);
      const bio: FirebaseListObservable<any> = this._db.list(bioPath);

      this._bioSubscription = bio.subscribe(result => {
        if (result.length) {
          this.hasBio = true;
          this.bio = result[0].bioSubForm;
        }
      });
    } else {
      this.qKeys.forEach(key => {
        if (this.qForm.value[key]) {
          const answersPath: string = this._afUtils.afPathMaker(["answers", key]);
          const answers: FirebaseListObservable<any> = this._db.list(answersPath);

          this._sourceService.getSource().subscribe(
            (response: IGeoLocation) => {
              this._finishSubmit(answers, key, response);
            },
            error => {
              const noGeoLoc: IGeoLocation = {
                ip: "",
                country_name: "",
                country_code: ""
              };
              this._finishSubmit(answers, key, noGeoLoc);
            }
          );
        }
      });
    }
  }

  private _finishSubmit(
    answers: FirebaseListObservable<any>,
    key: string,
    response: IGeoLocation
    ): void {
    answers.push({
      answer: this.qForm.value[key],
      timeSubmitted: Date.now(),
      ip: response.ip
    })
      .then(response => {
        this.qForm.reset();
        this.successfulSub = true;
        window.scroll({ top: 0, left: 0, behavior: "smooth" });

        const bioPath: string = this._afUtils.afPathMaker(["bios", this._userId, this._bioId]);
        const bio: FirebaseListObservable<any> = this._db.list(bioPath);

        this._bioSubscription = bio.subscribe(result => {
          if (result.length) {
            this.hasBio = true;
            this.bio = result[0].bioSubForm;
          }
        });
      })
      .catch(error => {
        this._alertsService.addAlert({
          type: BSAlertTypes.danger,
          messagePrimary: "Please try again. Something went wrong.",
          persistent: false
        });
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      });
  }

  private _isSameUser(): boolean {
    const localId: Object = this._dataStore.getLocalId();
    return localId ? localId["user"] === this._userId : false;
  }
}