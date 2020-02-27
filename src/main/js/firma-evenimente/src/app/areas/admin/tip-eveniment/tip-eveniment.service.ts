import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipEveniment } from 'src/app/Models/admin/tip-eveniment';

@Injectable({
  providedIn: 'root'
})
export class TipEvenimentService {


  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipEveniment';
  }

  GetTipEveniment(): Observable<TipEveniment[]> {

    return this.http.get<TipEveniment[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipEveniment(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipEveniment(tipEveniment: TipEveniment): Observable<TipEveniment>{

    return this.http.post<TipEveniment>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipEveniment
    );
  }

  UpdateTipEveniment(tipEveniment: TipEveniment, id: number): Observable<TipEveniment>{
    return this.http.put<TipEveniment>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      tipEveniment
    );
  }
}
