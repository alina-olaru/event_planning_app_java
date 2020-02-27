import { NewEventComponent } from './new-event/new-event.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: "",
  component: LayoutComponent,
  children: [
    {
      path: "",
      redirectTo: "welcome"
    },
    {
      path:"welcome",
      component:WelcomeComponent
    },
    {
      path:"new-event",
      component:NewEventComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
