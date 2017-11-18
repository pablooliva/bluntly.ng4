import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { AuthService } from "../../shared/auth.service";
import { AFUtils } from "../../shared/utils";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "blnt-bio",
  templateUrl: "./bio.component.html",
  styleUrls: ["./bio.component.scss"]
})
export class BioComponent implements OnInit, OnDestroy {
  public bios: FirebaseListObservable<any[]>;
  public buttons: Object;
  public haveBios: boolean;

  private _userID: string;
  private _biosSubscription: Subscription;

  public constructor(
    private _authService: AuthService,
    private _db: AngularFireDatabase,
    private _afUtils: AFUtils
  ) {}

  public ngOnInit(): void {
    this.haveBios = false;
    this.buttons = {};
    this._userID = this._authService.currentUser["uid"];
    const recordPath: string = this._afUtils.afPathMaker(["bios", this._userID]);
    this.bios = this._db.list(recordPath);

    this._biosSubscription = this.bios.subscribe(records => {
      if (records.length) {
        this.haveBios = true;
      }
      records.forEach(record => {
        this.buttons[record.$key] = false;
      });
    });

    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  public ngOnDestroy(): void {
    if (this._biosSubscription) {
      this._biosSubscription.unsubscribe();
    }
  }

  public bioDelete(event: any, bioId: string): void {
    event.preventDefault();
    const recordPath: string = this._afUtils.afPathMaker(["bios", this._userID, bioId]);
    this._db.object(recordPath).remove();
  }
}