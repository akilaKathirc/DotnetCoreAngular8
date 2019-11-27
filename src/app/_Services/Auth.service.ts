import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: any;
  loginUrl: string = `${environment.ApiUrl}${"Auth/"}`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private _http: HttpClient) {}

  login(loginModel: any): Observable<any> {
    return this._http.post(`${this.loginUrl}${"login"}`, loginModel).pipe(
      map(resp => {
        const user = resp;
        if (user) {
          this.decodedToken = this.jwtHelper.decodeToken(user["token"]);
          localStorage.setItem("token", user["token"]);
        }
      })
    );
  }

  Register(registermodel: any) {
    return this._http.post(`${this.loginUrl}${"register"}`, registermodel);
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    if (typeof token === null || token === null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
