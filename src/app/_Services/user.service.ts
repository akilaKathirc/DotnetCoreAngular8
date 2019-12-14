import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { User } from "../_models/User";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class UserService {
  loginUrl: string = `${environment.ApiUrl}${"Users"}`;
  baseUrl: string = `${environment.ApiUrl}${"Photos/"}`;

  constructor(public _http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.loginUrl);
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(`${this.loginUrl}${"/"}${id}`);
  }

  updateUser(id: number, user: User) {
    return this._http.put(`${this.loginUrl}${"/"}${id}`, user);
  }

  setMainPhoto(userid: number, id: number): Observable<any> {
    const url = this.baseUrl + userid + "/photos/" + id + "/setMain";
    return this._http.post(url, {});
  }

  DeletePhoto(userid: number, id: number): Observable<any> {
    const url = this.baseUrl + userid + "/photos/" + id + "/delete";
    return this._http.delete(url, {}).pipe(
      map((res: Response) => {
                if (res) {
                    if (res.status === 201) {
                        return [{ status: res.status, json: res }]
                    }
                    else if (res.status === 200) {
                        return [{ status: res.status, json: res }]
                    }
                }
            }),catchError((error: any) => {
                if (error.status === 500) {
                    return throwError(new Error(error.status));
                }
                else if (error.status === 400) {
                    return throwError(new Error(error.status));
                }
                else if (error.status === 409) {
                    return throwError(new Error(error.status));
                }
                else if (error.status === 406) {
                    return throwError(new Error(error.status));
                }
            })
    );
  }
}
