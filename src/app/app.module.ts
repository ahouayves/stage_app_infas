import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx'; // Ajoutez cette ligne

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [Geolocation,BarcodeScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
