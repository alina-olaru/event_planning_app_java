import { GlobalVarService } from './../../../services/global-var.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipUtilizator } from 'src/app/Models/admin/tip-utilizator';

@Injectable({
  providedIn: 'root'
})
export class TipUtilizatoriService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tiputilizatori';
  }

  GetTipUtilizatori(): Observable<TipUtilizator[]> {

    return this.http.get<TipUtilizator[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipUtilizatori(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipUtilizator(tipUtilizator: TipUtilizator): Observable<TipUtilizator>{

    return this.http.post<TipUtilizator>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipUtilizator
    );

  }

}
