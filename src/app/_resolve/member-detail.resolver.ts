import { AlertifyService } from './../_Services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_Services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

constructor(private userService:UserService,private alertifyjs:AlertifyService,private router:Router) { }

resolve(route:ActivatedRouteSnapshot):Observable<User>{
 return this.userService.getUser(route.params['id']).pipe(
   catchError((error) => {
   this.alertifyjs.error('Proble retrieving data  !!!' + error);
   this.router.navigate(['/members']);
   return of(null);
 }));
}
}
