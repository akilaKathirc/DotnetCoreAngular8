import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { User } from "src/app/_models/User";
import { Router } from "@angular/router";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"]
})
export class MemberCardComponent implements OnInit, OnChanges {
  @Input() user: User;
  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnChanges() {
    //  console.log(this.user);
  }

}
