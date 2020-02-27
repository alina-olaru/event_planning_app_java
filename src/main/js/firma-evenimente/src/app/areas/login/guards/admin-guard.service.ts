import { LoginService } from './../login.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, CanActivateChild {
  canActivateChild(childRoute: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    if(this.authService.getUser() && this.authService.getUser().id_nivel_acces == 1){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    if(this.authService.getUser() && this.authService.getUser().id_nivel_acces == 1){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  constructor(private authService: LoginService,
    private router: Router) { }
}
