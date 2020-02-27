import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipAccesSubEveniment } from 'src/app/Models/admin/tip-acces-sub-eveniment';

@Injectable({
  providedIn: 'root'
})
export class TipAccesSubEvenimentService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipAccesSubEveniment';
  }

  GetTipAccesSubEvenimenti(): Observable<TipAccesSubEveniment[]> {

    return this.http.get<TipAccesSubEveniment[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipAccesSubEvenimenti(id_sub_eveniment: number, id_acces: number ): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id_sub_eveniment + "/" +id_acces
    );
  }

  AddTipAccesSubEveniment(tipAccesSubEveniment: TipAccesSubEveniment): Observable<TipAccesSubEveniment>{

    return this.http.post<TipAccesSubEveniment>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipAccesSubEveniment
    );

  }
}
