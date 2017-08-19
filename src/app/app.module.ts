import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UIRouterModule, UIView } from "@uirouter/angular";
import { CollapseModule } from "ngx-bootstrap";

import { uiRouterConfigFn } from "./global/uiRouter.config";
import { APP_STATES } from "./app.states";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./account/login.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCIPhEH00KIYLDHiQ_hnJf1Ocr8xpKmq3c",
      authDomain: "bluntly.firebaseapp.com",
      databaseURL: "https://bluntly.firebaseio.com",
      storageBucket: "firebase-bluntly.appspot.com"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: {state: "home"},
      config: uiRouterConfigFn
    }),
    CollapseModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  bootstrap: [
    UIView
  ]
})
export class AppModule {
}
