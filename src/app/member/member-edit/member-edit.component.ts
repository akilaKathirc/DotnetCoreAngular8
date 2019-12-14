import { AuthService } from "./../../_Services/Auth.service";
import { AlertifyService } from "./../../_Services/alertify.service";
import { FormControl } from "@angular/forms";
import { Component, OnInit, HostListener } from "@angular/core";
import { User } from "src/app/_models/User";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/app/_Services/user.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event) {
    if (this.userForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private activateroute: ActivatedRoute,
    private alertifyjs: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.activateroute.data.subscribe(data => {
      this.user = <User>data["editmember"];
      this.InitializeUserForm();
    });
  }

  InitializeUserForm() {
    this.userForm = new FormGroup({
      introduction: new FormControl(this.user.introduction),
      lookingFor: new FormControl(this.user.lookingFor),
      interest: new FormControl(this.user.interest),
      city: new FormControl(this.user.city),
      country: new FormControl(this.user.country)
    });
  }

  loadValues() {
    this.user.introduction = this.userForm.value.introduction;
    this.user.interest = this.userForm.value.interests;
    this.user.lookingFor = this.userForm.value.lookingfor;
    this.user.city = this.userForm.value.city;
    this.user.country = this.userForm.value.country;
  }

  SubmitForm() {
    console.log(this.userForm, this.user);
    // this.loadValues();
    this.user = this.userForm.value;
    const id = this.authService.decodedToken.nameid;
    this.userService.updateUser(id, this.user).subscribe(
      () => {
        this.alertifyjs.success("User details updated successfully!!!");
        this.userForm.reset(this.user);
      },
      error => this.alertifyjs.error(error)
    );
  }

  SetMainPhoto(photoUrl:string){
 this.user.photoUrl = photoUrl;
  }
}
