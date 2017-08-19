import { Component, OnInit } from "@angular/core";
import { UIRouter } from "@uirouter/angular";

import "../assets/css/font-awesome.css";
import "../assets/css/styles.scss";

@Component({
  selector: "blnt-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  public isCollapsed: boolean = false;
  public isHome: boolean = false;

  public constructor(private _router: UIRouter) {
  }

  public ngOnInit(): void {
    this.isCollapsed = true;
    this.isHome = this._router.globals.$current.name === "home";
  }
}
