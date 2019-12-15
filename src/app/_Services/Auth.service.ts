import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { User } from '../_models/User';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: any;
  loginUrl: string = `${environment.ApiUrl}${"Auth/"}`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser:User;
  public bSubject = new Subject<string>();

  constructor(private _http: HttpClient) {
    this.bSubject.asObservable();

  }

  login(loginModel: any): Observable<any> {
    return this._http.post(`${this.loginUrl}${"login"}`, loginModel).pipe(
      map(resp => {
        const userDetails = resp;
        if (userDetails) {
          this.decodedToken = this.jwtHelper.decodeToken(userDetails["token"]);
          localStorage.setItem("token", userDetails["token"]);
  localStorage.setItem("user", JSON.stringify(userDetails["user"]));
this.currentUser = userDetails["user"];
this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }


changeMemberPhoto(photoUrl:string){
  this.bSubject.next(photoUrl);
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
