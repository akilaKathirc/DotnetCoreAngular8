import { AuthService } from "./../_Services/Auth.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { AlertifyService } from "../_Services/alertify.service";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { User } from "../_models/User";
import { Router } from "@angular/router";

@Component({
  selector: "app-Register",
  templateUrl: "./Register.component.html",
  styleUrls: ["./Register.component.css"]
})
export class RegisterComponent implements OnInit {
  colorTheme = "theme-green";
  bsConfig: Partial<BsDatepickerConfig>;
  user: User;
  @Output() CancelRegistration = new EventEmitter();
  @Input() weatherValues;

  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["male"],
        Username: ["", Validators.required],
        knownAs: ["", Validators.required],
        city: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        country: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmpassword: ["", [Validators.required]]
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmpassword").value;
    return pass === confirmPass ? null : { notSame: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.Register(this.user).subscribe(
        success => {
          this.alertifyService.success("Registration successful");
        },
        error => {
          this.alertifyService.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(["/members"]);
          });
        }
      );
    }
  }

  cancel() {
    this.CancelRegistration.emit(false);
    this.registerForm.reset();
    this.alertifyService.warning("Cancelled");
  }
}
