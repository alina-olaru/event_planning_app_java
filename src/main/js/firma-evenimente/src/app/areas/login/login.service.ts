import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { GlobalVarService } from "./../../services/global-var.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/Models/User";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  baseUrl: string;
  private user: User = null;
  constructor(
    private httpClient: HttpClient,
    private gloablVarService: GlobalVarService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.baseUrl = "/api/user";

    let cachedUser = this.cookieService.get("auth-user-info");
    if (cachedUser != null && cachedUser != "") {
      this.user = JSON.parse(cachedUser) as User;
    }
  }

  getUser() {
    return this.user;
  }

  loginUser(username: string, password: string): Observable<User> {
    return this.httpClient
      .post<User>(this.gloablVarService.globalUrl + this.baseUrl + "/login", {
        username,
        password
      })
      .pipe(
        tap(x => {
          if (x) {
            this.user = x;

            let today: Date = new Date();
            today.setDate(today.getDate() + 7);
            this.cookieService.set("auth-user-info", JSON.stringify(x), today);
          }
        })
      );
  }

  logOutUser(){
    this.cookieService.delete("auth-user-info", "/");
    this.user = null;
    this.router.navigate(["login"]);
  }

}
