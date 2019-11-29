import { MemberEditResolver } from "./_resolve/member-edit.resolver";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./Home/Home.component";
import { RegisterComponent } from "./Register/Register.component";
import { ErrorInterceptorProvider } from "./_Services/error.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxGalleryModule } from "ngx-gallery";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberListComponent } from "./member/member-list/member-list.component";
import { MemberCardComponent } from "./member/member-card/member-card.component";
import { JwtModule } from "@auth0/angular-jwt";
import { MemberDetailComponent } from "./member/member-detail/member-detail.component";
import { TabsModule } from "ngx-bootstrap";
import { MemberDetailResolver } from "./_resolve/member-detail.resolver";
import { MemberListResolver } from "./_resolve/member-list.resolver";
import { MemberEditComponent } from "./member/member-edit/member-edit.component";
import { PreventUnsavedChanges } from './_guards/preven-unsaved-changes.guard';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    TabsModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44342"],
        blacklistedRoutes: ["localhost:44342/api/auth"]
      }
    }),
    NgxGalleryModule
  ],
  providers: [
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
