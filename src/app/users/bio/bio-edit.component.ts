import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/auth.service";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: "blnt-bio-create",
  templateUrl: "./bio-edit.component.html",
  styleUrls: [ "./bio-edit.component.scss" ]
})
export class BioEditComponent implements OnInit {
  public createBio: boolean = true;
  private _userID: AngularFireAuth;

  public constructor(private _authService: AuthService) {}

  public ngOnInit(): void {
    this._userID = this._authService.currentAuth["uid"];
    console.warn(this._userID);
  }

  public optionChosen(option: string): void {

  }
}