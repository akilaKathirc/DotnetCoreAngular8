import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertifyService } from '../_Services/alertify.service';

@Component({
  selector: "app-Home",
  templateUrl: "./Home.component.html",
  styleUrls: ["./Home.component.css"]
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  weathers: any;
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService
  ) {
  //  this.getValues();
  }

  Register() {
    this.registerMode = true;
  }

  ngOnInit() {}

  Cancel(registerModeOP: boolean) {
    this.registerMode = registerModeOP;
  }

  getValues() {
    this.http
      .get("https://localhost:44342/WeatherForecast/GetWheathers")
      .subscribe(
        response => {
          this.weathers = response;
        },
        error => {
          this.alertifyService.error(error);
        }
      );
  }
}
