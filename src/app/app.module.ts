import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { UsersModule } from "./users/users.module";

import { AuthService } from "./shared/auth.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
    UsersModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
