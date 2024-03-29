import { OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./_Services/Auth.service";
import { Component } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "./_models/User";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  jwtHelper = new JwtHelperService();
  constructor(public authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    const user: User = JSON.parse(localStorage.getItem("user"));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(this.authService.currentUser.photoUrl);
      this.authService.currentUser.photoUrl = this.authService.currentUser.photoUrl;
    }
  }

  ngOnDestroy() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
