import { UsersComponent } from './users/users.component';
import { LayoutUsersComponent } from './layout-users/layout-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    component: LayoutUsersComponent,
    children: [
      {
        path: "",
        redirectTo: "utilizatori"
      },
      {
        path:"utilizatori",
        component:UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizatorRoutingModule { }
