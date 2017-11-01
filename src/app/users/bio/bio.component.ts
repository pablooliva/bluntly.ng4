import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { AuthService } from "../../shared/auth.service";
import { AFUtils } from "../../shared/utils";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "blnt-bio",
  templateUrl: "./bio.component.html"
})
export class BioComponent implements OnInit, OnDestroy {
  public bios: FirebaseListObservable<any[]>;
  public buttons: Object;

  private _userID: string;
  private _biosSubscription: Subscription;

  public constructor(
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils
  ) {}

  public ngOnInit(): void {
    this.buttons = {};
    this._userID = this._authService.currentUser["uid"];
    this.bios = this._db.list("/bios/" + this._userID);

    this._biosSubscription = this.bios.subscribe(records => {
      records.forEach(record => {
        this.buttons[record.$key] = false;
      });
    });
  }

  public ngOnDestroy(): void {
    if (this._biosSubscription) {
      this._biosSubscription.unsubscribe();
    }
  }

  public showDelete(event: any, bioId: string): void {
    event.preventDefault();
    this.buttons[bioId] = true;
  }

  public hideDelete(event: any, bioId: string): void {
    event.preventDefault();
    this.buttons[bioId] = false;
  }

  public bioDelete(event: any, bioId: string): void {
    event.preventDefault();
    const recordPath: string = this._afUtils.afPathMaker(["bios", this._userID, bioId]);
    this._db.object(recordPath).remove();
  }
}