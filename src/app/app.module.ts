import { HttpClientModule } from "@angular/common/http";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WeatherComponent } from "./Weather/Weather.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
