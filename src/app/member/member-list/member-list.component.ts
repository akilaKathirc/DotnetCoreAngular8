import { UserService } from "../../_Services/user.service";
import { AlertifyService } from "../../_Services/alertify.service";
import { User } from "../../_models/User";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private alertify: AlertifyService,
    private userService: UserService,
    private activateroute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loadUsers();

    this.activateroute.data.subscribe(data => {
      this.users = data["users"];
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        console.log("Load users completed successfully");
      }
    );
  }
}
