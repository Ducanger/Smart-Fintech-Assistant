import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { getApp, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import {
  provideAuth,
  getAuth,
  initializeAuth,
  indexedDBLocalPersistence,
} from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { Capacitor } from "@capacitor/core";
import { TransferCardComponent } from "./components/transfer-card/transfer-card.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, TransferCardComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence,
        });
      } else {
        return getAuth();
      }
    }),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
