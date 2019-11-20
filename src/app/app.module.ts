import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WeatherComponent } from "./Weather/Weather.component";
import { CommonModule } from "@angular/common";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./Home/Home.component";
import { RegisterComponent } from "./Register/Register.component";
import { ErrorInterceptorProvider } from "./_Services/error.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
