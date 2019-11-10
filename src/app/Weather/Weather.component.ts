import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-Weather",
  templateUrl: "./Weather.component.html",
  styleUrls: ["./Weather.component.css"]
})
export class WeatherComponent implements OnInit {
  weathers: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get("https://localhost:44342/weatherforecast").subscribe(
      response => {
        this.weathers = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
