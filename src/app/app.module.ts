import { BrowserModule, Meta, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AuthService } from "./shared/auth.service";
import { AuthGuardService } from "./shared/auth-guard.service";
import { AFUtils } from "./shared/utils";
import { AlertsService} from "./shared/alerts/alerts.service";
import { AlertGuardService } from "./shared/alerts/alert-guard.service";
import { SourceService } from "./shared/source.service";
import { DataStoreService } from "./shared/data-store.service";

declare let ga: any;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCIPhEH00KIYLDHiQ_hnJf1Ocr8xpKmq3c",
      authDomain: "bluntly.firebaseapp.com",
      databaseURL: "https://bluntly.firebaseio.com",
      storageBucket: "firebase-bluntly.appspot.com"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AFUtils,
    AlertsService,
    AlertGuardService,
    SourceService,
    DataStoreService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _title: Title,
    private _meta: Meta
  ) {
    let thisEvent: any;

    this._router.events
      .filter((event) => event instanceof NavigationEnd)
      .map((event) => thisEvent = event)
      .map(() => this._activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === "primary")
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this._title.setTitle(event["title"]);
        this._meta.updateTag(
          { name: "description", content: event["description"] },
          `name="description"`
        );
        ga("send", "pageview", thisEvent.urlAfterRedirects);
      });
  }
}