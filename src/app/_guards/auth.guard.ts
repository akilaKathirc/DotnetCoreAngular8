import { AlertifyService } from "./../_Services/alertify.service";
import { AuthService } from "./../_Services/Auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertifyJs: AlertifyService
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertifyJs.error(
      "You are not allowed to view this page...Please Login!!!!"
    );
    this.router.navigate(["/home"]);
    return false;
  }
}
