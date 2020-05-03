import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { EventService } from './services/event/event.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { IonicStorageModule } from "@ionic/storage";
import { NewUserComponent } from './tab2/new-user/new-user.component';
import { UserService } from './services/user/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent
  ],
  entryComponents: [
    NewUserComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EventService,
    UserService,
    AuthService,
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
