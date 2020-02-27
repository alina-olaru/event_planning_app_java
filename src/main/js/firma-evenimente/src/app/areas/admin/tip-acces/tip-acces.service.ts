import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipAcces } from 'src/app/Models/admin/tip-acces';

@Injectable({
  providedIn: 'root'
})
export class TipAccesService {


  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipAcces';
  }

  GetTipAcces(): Observable<TipAcces[]> {

    return this.http.get<TipAcces[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipAcces(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipAcces(tipAcces: TipAcces): Observable<TipAcces>{

    return this.http.post<TipAcces>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipAcces
    );

  }
}
