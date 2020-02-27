import { OrganizatorModule } from './areas/organizator/organizator.module';

import { OrganizatoriGuardService } from './areas/login/guards/organizatori-guard.service';
import { HomeGuardService } from './areas/login/guards/home-guard.service';
import { HomeModule } from './areas/home/home.module';
import { AdminGuardService } from './areas/login/guards/admin-guard.service';
import { AdminModule } from './areas/admin/admin.module';
import { RegisterComponent } from './areas/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from  './areas/login/login.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [AdminGuardService],
    canActivateChild: [AdminGuardService]
  },
  {
    path: 'home',
    loadChildren: () => HomeModule,
    canActivate: [HomeGuardService],
    canActivateChild: [HomeGuardService]
  },
  {
    path: 'organizatori',
    loadChildren: () => OrganizatorModule,
    canActivate: [OrganizatoriGuardService],
    canActivateChild: [OrganizatoriGuardService]
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch: 'full'
  },

  {
    path:'**',
    component:LoginComponent
  }
  //TODO :ADD 404 PAGE
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
