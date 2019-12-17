import { PreventUnsavedChanges } from "./_guards/preven-unsaved-changes.guard";
import { MemberListResolver } from "./_resolve/member-list.resolver";
import { MemberDetailComponent } from "./member/member-detail/member-detail.component";
import { AuthGuard } from "./_guards/auth.guard";
import { ListsComponent } from "./lists/lists.component";
import { MemberListComponent } from "./member/member-list/member-list.component";
import { HomeComponent } from "./Home/Home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { MemberDetailResolver } from "./_resolve/member-detail.resolver";
import { MemberEditComponent } from "./member/member-edit/member-edit.component";
import { MemberEditResolver } from "./_resolve/member-edit.resolver";
import { GlowingborderComponent } from "./glowingborder/glowingborder.component";
import { GlowingtextComponent } from "./glowingtext/glowingtext.component";
import { GlowingloaderComponent } from "./glowingloader/glowingloader.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { editmember: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: "member/:id",
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      { path: "lists", component: ListsComponent },
      { path: "messages", component: MessagesComponent },
      { path: "glowingborder", component: GlowingborderComponent },
      { path: "glowingtext", component: GlowingtextComponent },
      { path: "glowingloader", component: GlowingloaderComponent }
    ]
  },

  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
