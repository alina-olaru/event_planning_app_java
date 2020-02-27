import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { Utilizator } from 'src/app/Models/admin/utilizator';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/organizatori-utilizatori';
  }

  GetUtilizatori(): Observable<Utilizator[]> {

    return this.http.get<Utilizator[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteUtilizatori(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddUtilizator(utilizator: Utilizator): Observable<Utilizator>{

    return this.http.post<Utilizator>(
      this.globalVarService.globalUrl + this.baseUrl,
      utilizator
    );
  }

  UpdateUtilizator(utilizator: Utilizator, id: number): Observable<Utilizator>{
    return this.http.put<Utilizator>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      utilizator
    );
  }
}
