import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { AuthService } from "../../shared/auth.service";
import { AFUtils } from "../../shared/utils";
import { AlertsService } from "../../shared/alerts/alerts.service";
import { BSAlertTypes } from "../../shared/alerts/alerts.component";
import { atLeastOneRequired, Unique } from "../../shared/validation/custom.validators";
import { ControlType } from "../../shared/validation/form-validation-messages.component";

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
  public shareLinkPre: string;

  public constructor(
    public fb: FormBuilder,
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils,
    private _alertsService: AlertsService,
    private _elemRef: ElementRef,
    private _renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.userId = this._authService.currentUser["uid"];

    const orderBy: string = "setName";
    const biosPath: string = this._afUtils.afPathMaker(["bios", this.userId]);
    const questionsPath: string = this._afUtils.afPathMaker(["questions", this.userId]);

    this.shareLinkPre = "";
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

    this.controlValidation["text"] = {
      control: this.askQForm.controls.setName,
      type: ControlType[ControlType.text],
      message: {unique: "Set name is already in use. Please choose another name."}
    };
    this.controlValidation["group"] = {
      control: this.askQForm.controls.questions,
      type: ControlType[ControlType.group],
      message: {groupValidation: "At least one question is required."}
    };
  }

  public saveQSet(): void {
    this.questionSets.push(this.askQForm.value)
      .then(response => {
        this._alertsService.addAlert({
          type: BSAlertTypes.success,
          messagePrimary: `New question set, ${this.askQForm.value.setName}, successfully created.`,
          persistent: false
        });

        this.askQForm.reset();
        this.showForm = false;
      })
      .catch(error => {
        this._alertsService.addAlert({
          type: BSAlertTypes.danger,
          messagePrimary: "Please try again. Something went wrong.",
          persistent: false
        });
      });
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
}