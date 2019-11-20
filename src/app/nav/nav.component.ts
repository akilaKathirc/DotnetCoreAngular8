import { AlertifyService } from "./../_Services/alertify.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../_Services/Auth.service";
import { Subscriber } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl("name", [Validators.required]),
      password: new FormControl("password")
    });
  }

  ngOnInit() {}

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
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem("token");
    this.alertifyService.message("logged out successful");
  }
}
