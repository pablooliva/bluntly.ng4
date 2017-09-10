import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

import { AuthService } from "../../shared/auth.service";
import { ControlType } from "../../shared/validation/form-validation-messages.component";
import { AFUtils } from "../../shared/utils";
import { Unique } from "../../shared/validation/custom.validators";
import { AlertsService } from "../../shared/alerts/alerts.service";
import { BSAlertTypes } from "../../shared/alerts/alerts.component";

@Component({
  selector: "blnt-bio",
  templateUrl: "./bio.component.html",
  styleUrls: [ "./bio.component.scss" ]
})
export class BioComponent implements OnInit {
  public createBioFlag: boolean = true;
  public bioForm: FormGroup;
  public controlValidation: Object = {};
  public bio: FirebaseObjectObservable<any[]>;

  private _userID: AngularFireAuth;

  public constructor(
    public fb: FormBuilder,
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils,
    private _alertsService: AlertsService) {}

  public ngOnInit(): void {
    this._userID = this._authService.currentAuth["uid"];
    this.bio = this._db.object("/bios");

    const orderBy: string = "bioName";
    const recordPath: string = this._afUtils.afPathMaker(["bios", this._userID.toString()]);

    this.bioForm = this.fb.group({
      bioName: ["", Validators.required, Unique.createValidator(this._db, recordPath, orderBy)],
      userName: [""],
      fact: [""],
      desc: [""],
      facebook: [""],
      twitter: [""],
      linkedin: [""],
      xing: [""],
      github: [""],
      other: this.fb.group({
        one: this.fb.group({
          name: [""],
          link: [""]
        }),
        two: this.fb.group({
          name: [""],
          link: [""]
        })
      })
    });

    this.controlValidation["text"] = {
      control: this.bioForm.controls.bioName,
      type: ControlType[ControlType.text],
      message: {unique: "Bio name is already in use. Please choose another name."}
    };
  }

  public createBio(flag: boolean): void {
    this.createBioFlag = flag;
  }

  public onCreate(): void {
    const newBio: Object = {};
    const newBioNamed: Object = {};
    newBioNamed[this.bioForm.value.bioName] = this.bioForm.value;
    newBio[this._userID.toString()] = newBioNamed;
    this.bio.update(newBio)
      .then(response => {
        this.bioForm.reset();

        this._alertsService.addAlert({
          type: BSAlertTypes.success,
          messagePrimary: "Bio successfully created.",
          persistent: false
        });
      })
      .catch(error => {
        this._alertsService.addAlert({
          type: BSAlertTypes.danger,
          messagePrimary: "Please try again. Something went wrong.",
          persistent: false
        });
      });
  }
}