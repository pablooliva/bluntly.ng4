import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "blnt-bio-edit",
  templateUrl: "./bio-edit.component.html"
})
export class BioEditComponent implements OnInit {
  public bioId: string;

  constructor(private _route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.bioId = this._route.snapshot.params["bioId"];
  }
}