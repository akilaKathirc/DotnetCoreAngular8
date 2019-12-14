import { AlertifyService } from "./../_Services/alertify.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../_Services/Auth.service";
import { Subscriber } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;
  UserPhotoUrl:string;
  constructor(
    public authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl("name", [Validators.required]),
      password: new FormControl("password")
    });
     this.authService.bSubject.subscribe(photoUrl => {
       if (photoUrl) {
         this.UserPhotoUrl = photoUrl;
       }
     });
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(["/members"]);
    }
  }

  SubmitLogin() {
    const loginModel = {
      UserName: this.loginForm.value["userName"],
      password: this.loginForm.value["password"]
    };
    this.authService.login(loginModel).subscribe(
      next => {
        this.alertifyService.success("logged in successful");
      },
      error => {
        this.alertifyService.error("Unauthourized");
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem("token");
     localStorage.removeItem("user");
     this.authService.decodedToken = null;
     this.authService.currentUser = null;
     
     this.alertifyService.message("logged out successful");
    this.router.navigate(["/home"]);
  }
}
