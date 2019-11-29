import { AlertifyService } from "./../../_Services/alertify.service";
import { FormControl } from "@angular/forms";
import { Component, OnInit, HostListener } from "@angular/core";
import { User } from "src/app/_models/User";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";

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
    private alertifyjs: AlertifyService
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
      lookingfor: new FormControl(this.user["lookingFor"]),
      interests: new FormControl(this.user.interest),
      city: new FormControl(this.user.city),
      country: new FormControl(this.user.country)
    });
  }

  SubmitForm() {
    console.log(this.userForm);
    this.alertifyjs.success("User details updated successfully!!!");
    this.userForm.reset(this.user);
  }
}
