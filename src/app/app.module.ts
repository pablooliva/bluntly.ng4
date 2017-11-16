import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AuthService } from "./shared/auth.service";
import { AFUtils } from "./shared/utils";
import { AlertsService} from "./shared/alerts/alerts.service";
import { AlertGuardService } from "./shared/alerts/alert-guard.service";
import { SourceService } from "./shared/source.service";

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
    AFUtils,
    AlertsService,
    AlertGuardService,
    SourceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
