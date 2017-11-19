import { Component, ElementRef, OnInit, Renderer2,} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { cloneDeep } from "lodash";
import { Object } from "core-js";

import { AuthService } from "../../shared/auth.service";
import { AFUtils } from "../../shared/utils";
import { AlertsService } from "../../shared/alerts/alerts.service";
import { BSAlertTypes } from "../../shared/alerts/alerts.component";
import { atLeastOneRequired, Unique } from "../../shared/validation/custom.validators";
import { ControlType } from "../../shared/validation/form-validation-messages.component";
import { Router } from "@angular/router";
import { DataStoreService, IDataStore } from "../../shared/data-store.service";

@Component({
  selector: "blnt-ask",
  templateUrl: "./ask.component.html",
  styleUrls: ["./ask.component.scss"]
})
export class AskComponent implements OnInit {
  public showForm: boolean;
  public askQForm: FormGroup;
  public controlValidation: Object = {};
  public bios: FirebaseListObservable<any[]>;
  public questionSets: FirebaseListObservable<any[]>;
  public userId: string;
  public stashFormOption: boolean;

  public constructor(
    public fb: FormBuilder,
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils,
    private _alertsService: AlertsService,
    private _elemRef: ElementRef,
    private _renderer: Renderer2,
    private _router: Router,
    private _dataStore: DataStoreService
  ) {}

  public ngOnInit(): void {
    this.userId = this._authService.currentUser["uid"];

    const orderBy: string = "setName";
    const biosPath: string = this._afUtils.afPathMaker(["bios", this.userId]);
    const questionsPath: string = this._afUtils.afPathMaker(["questions", this.userId]);

    this.stashFormOption = false;
    this.showForm = false;
    this.bios = this._db.list(biosPath);
    this.questionSets = this._db.list(questionsPath);
    this.askQForm = this.fb.group({
      setName: ["", Validators.required, Unique.createValidator(this._db, questionsPath, orderBy, null)],
      questions: this.fb.group({
        question1: [""],
        question2: [""],
        question3: [""]
      }, {validator: atLeastOneRequired()}),
      bio: [""]
    });

    const qFormData: IDataStore = this._dataStore.getFromStorage("newQuestions");
    if (qFormData) {
      this.askQForm.setValue(qFormData.data);
      this._dataStore.removeFromStorage("newQuestions");
    }

    this.controlValidation["text"] = {
      control: this.askQForm.controls.setName,
      type: ControlType[ControlType.text],
      message: {unique: "Set name is already used. Please choose another name."}
    };
    this.controlValidation["group"] = {
      control: this.askQForm.controls.questions,
      type: ControlType[ControlType.group],
      message: {groupValidation: "At least one (1) question is required."}
    };
  }

  public evalNavToBio(): void {
    if (this._valuesEmtpy(this.askQForm.value)) {
      this._router.navigate(["/users/bio"]);
    } else {
      this.stashFormOption = true;
    }
  }

  public navToBio(save: boolean): void {
    if (save) {
      this._dataStore.putInStorage({name: "newQuestions", data: this.askQForm.value});
    }
    this._router.navigate(["/users/bio"]);
  }

  public saveQSet(): void {
    const qForm: Object = cloneDeep(this.askQForm.value);
    qForm["questions"] = {};
    qForm["active"] = true;
    qForm["timeCreated"] = Date.now();

    this.showForm = false;
    this.questionSets.push(qForm)
      .then(response => {
        const qPath: string = this._afUtils.afPathMaker(["questions", this.userId, response.key, "questions"]);
        const setQuestions: FirebaseListObservable<any[]> = this._db.list(qPath);

        const filteredQuestions: string[] = Object.values(this.askQForm.value.questions).filter(value => value !== "");
        for (let i: number = 0; i < filteredQuestions.length; i++) {
          setQuestions.push(filteredQuestions[i])
            .then(response2 => {
              if (i === filteredQuestions.length - 1) {
                this._alertsService.addAlert({
                  type: BSAlertTypes.success,
                  messagePrimary: `New question set "${this.askQForm.value.setName}" successfully created.`,
                  persistent: false
                });
                this.askQForm.reset();
                window.scroll({ top: 0, left: 0, behavior: "smooth" });
              }
            })
            .catch(error => {
              this.showForm = true;
              this.questionSets.remove(response.key);
              this._errorMsg();
            });
        }
      })
      .catch(error => {
        this.showForm = true;
        this._errorMsg();
      });
  }

  public cancelQSet(): void {
    this.showForm = false;
    this.askQForm.reset();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  public copyLink(event: MouseEvent): void {
    const elem: HTMLElement = this._elemRef.nativeElement.querySelector("#" + event.srcElement.id);

    this._renderer.removeClass(elem, "btn-primary");
    this._renderer.addClass(elem, "btn-success");
    elem.innerText = "Link Copied";

    setTimeout(() => {
      this._renderer.removeClass(elem, "btn-success");
      this._renderer.addClass(elem, "btn-primary");
      elem.innerText = "Copy Link";
    }, 3000);
  }

  private _errorMsg(): void {
    this._alertsService.addAlert({
      type: BSAlertTypes.danger,
      messagePrimary: "Please try again. Something went wrong.",
      persistent: false
    });
  }

  private _valuesEmtpy(obj: Object): boolean {
    let isEmpty: boolean = true;
    const objKeys: string[] = Object.keys(obj);

    objKeys.forEach(key => {
      if (obj[key] !== null && typeof obj[key] === "object") {
        if (!this._valuesEmtpy(obj[key])) {
          isEmpty = false;
        }
      } else {
        if (obj[key] !== "") {
          isEmpty = false;
        }
      }
    });

    return isEmpty;
  }
}