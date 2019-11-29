import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../member/member-edit/member-edit.component";

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<MemberEditComponent> {
  canDeactivate(
    component: MemberEditComponent,
    currentRoute: import("@angular/router").ActivatedRouteSnapshot,
    currentState: import("@angular/router").RouterStateSnapshot,
    nextState?: import("@angular/router").RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (component.userForm.dirty) {
      return confirm(
        "You are having unsaved changes.Are you sure you want to move away from this page?"
      );
    }
    return true;
  }
  constructor() {}
}
  
  

