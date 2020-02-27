import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl: string;
  constructor(private httpClient: HttpClient,
              private gloablVarService: GlobalVarService,
              private cookieService: CookieService)  {
      this.baseUrl = '/api/user';
  }

  RegisterUser(nume: string, prenume: string,
               numar_telefon: string, adresa_mail: string,
               username: string, parola: string) : Observable<User>
  {

    return this.httpClient.post<User>(
      this.gloablVarService.globalUrl + this.baseUrl + "/register",
      {
        nume, prenume, numar_telefon, adresa_mail, username, parola
      }
    ).pipe(
      tap(x=>{
        if(x){
          let today: Date = new Date();
          today.setDate(today.getDate() + 7);
          this.cookieService.set("auth-user-info", JSON.stringify(x), today);
        }
      })
    );

  }

}
