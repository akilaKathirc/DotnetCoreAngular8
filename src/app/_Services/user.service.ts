import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../_models/User";

@Injectable({
  providedIn: "root"
})
export class UserService {
  loginUrl: string = `${environment.ApiUrl}${"Users"}`;
  constructor(public _http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.loginUrl);
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(`${this.loginUrl}${"/"}${id}`);
  }
}
