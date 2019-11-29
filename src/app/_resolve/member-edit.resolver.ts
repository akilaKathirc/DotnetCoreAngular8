import { AlertifyService } from '../_Services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_Services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_Services/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

constructor(private userService:UserService,
  private authservice:AuthService,
  private alertifyjs:AlertifyService,
  private router:Router) { }

resolve(route:ActivatedRouteSnapshot):Observable<User>{
 return this.userService.getUser(this.authservice.decodedToken.nameid).pipe(
   catchError((error) => {
   this.alertifyjs.error('Proble retrieving data  !!!' + error);
   this.router.navigate(['/members']);
   return of(null);
 }));
}
}
