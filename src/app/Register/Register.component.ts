import { AuthService } from "./../_Services/Auth.service";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AlertifyService } from "../_Services/alertify.service";

@Component({
  selector: "app-Register",
  templateUrl: "./Register.component.html",
  styleUrls: ["./Register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() CancelRegistration = new EventEmitter();
  @Input() weatherValues;

  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {
    this.registerForm = new FormGroup({
      Username: new FormControl("username", Validators.required),
      password: new FormControl("password", Validators.required)
    });
  }

  ngOnInit() {}

  register() {
    const registerModel = {
      UserName: this.registerForm.value["Username"],
      passWord: this.registerForm.value["password"]
    };
    this.authService.Register(registerModel).subscribe(
      success => {
        this.alertifyService.success("Registration successful");
      },
      error => {
        this.alertifyService.error(error);
      },
      () => {
        this.alertifyService.message("Registration completed");
      }
    );
  }

  cancel() {
    this.CancelRegistration.emit(false);
    this.registerForm.reset();
    this.alertifyService.warning("Cancelled");
  }
}
