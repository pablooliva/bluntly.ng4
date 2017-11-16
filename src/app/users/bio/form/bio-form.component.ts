import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../../../shared/auth.service";
import { ControlType } from "../../../shared/validation/form-validation-messages.component";
import { AFUtils } from "../../../shared/utils";
import { atLeastOneRequired, Unique } from "../../../shared/validation/custom.validators";
import { AlertsService } from "../../../shared/alerts/alerts.service";
import { BSAlertTypes } from "../../../shared/alerts/alerts.component";

@Component({
  selector: "blnt-bio-form",
  templateUrl: "./bio-form.component.html",
  styleUrls: [ "./bio-form.component.scss" ]
})
export class BioFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public bioId: string;
  @ViewChild("needFocus") needFocus: ElementRef;

  public bioForm: FormGroup;
  public controlValidation: Object = {};
  public showOtherConnect: boolean;

  private _bio: FirebaseListObservable<any[]>;
  private _existingBio: FirebaseObjectObservable<any[]>;
  private _existingBioSubscription: Subscription;
  private _recordPath: string;

  public constructor(
    public fb: FormBuilder,
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils,
    private _alertsService: AlertsService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    const orderBy: string = "bioName";
    this.showOtherConnect = false;

    this._recordPath = this._afUtils.afPathMaker(["bios", this._authService.currentUser["uid"]]);
    this._bio = this._db.list(this._recordPath);

    this.bioForm = this.fb.group({
      bioName: ["", Validators.required, Unique.createValidator(this._db, this._recordPath, orderBy, this.bioId)],
      bioSubForm: this.fb.group({
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
      }, {validator: atLeastOneRequired()})
    });

    if (this.bioId) {
      this._existingBio = this._db.object(this._recordPath + "/" + this.bioId);
      this._existingBioSubscription = this._existingBio.subscribe(record => {
        this.bioForm.setValue(record);
        this.bioForm.updateValueAndValidity();
      });
    }

    this.controlValidation["text"] = {
      control: this.bioForm.controls.bioName,
      type: ControlType[ControlType.text],
      message: {unique: "Bio name is already in use. Please choose another name."}
    };
    this.controlValidation["group"] = {
      control: this.bioForm.controls.bioSubForm,
      type: ControlType[ControlType.group],
      message: {groupValidation: "At least one additional detail below is required."}
    };
  }

  public ngAfterViewInit(): void {
    this.needFocus.nativeElement.focus();
  }

  public ngOnDestroy(): void {
    if (this._existingBioSubscription) {
      this._existingBioSubscription.unsubscribe();
    }
  }

  public showOther(e: MouseEvent): void {
    e.preventDefault();
    this.showOtherConnect = true;
  }

  public onSubmit(): void {
    // UPDATE if we have a bioId
    if (this.bioId) {
      this._existingBio.update(this.bioForm.value)
        .then(response => {
          this._alertsService.addAlert({
            type: BSAlertTypes.success,
            messagePrimary: `Bio, ${this.bioForm.value.bioName}, successfully updated.`,
            persistent: true
          });

          this.bioForm.reset();
          this._router.navigate(["/users/bio"]);
        })
        .catch(error => {
          this._alertsService.addAlert({
            type: BSAlertTypes.danger,
            messagePrimary: "Please try again. Something went wrong.",
            persistent: false
          });
        });
    }
    // CREATE if no bioId present
    else {
      this._bio.push(this.bioForm.value)
        .then(response => {
          this._alertsService.addAlert({
            type: BSAlertTypes.success,
            messagePrimary: `New bio, ${this.bioForm.value.bioName}, successfully created.`,
            persistent: true
          });

          this.bioForm.reset();
          this._router.navigate(["/users/bio"]);
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
}