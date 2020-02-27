import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipLocatieSubEveniment } from 'src/app/Models/admin/tip-locatie-sub-eveniment';

@Injectable({
  providedIn: 'root'
})
export class TipLocatieSubEvenimentService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipLocatieSubEveniment';
  }

  GetTipLocatieSubEvenimenti(): Observable<TipLocatieSubEveniment[]> {

    return this.http.get<TipLocatieSubEveniment[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipLocatieSubEvenimenti(id_sub_eveniment: number, id_locatie: number ): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id_sub_eveniment + "/" +id_locatie
    );
  }

  AddTipLocatieSubEveniment(tipLocatieSubEveniment: TipLocatieSubEveniment): Observable<TipLocatieSubEveniment>{

    return this.http.post<TipLocatieSubEveniment>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipLocatieSubEveniment
    );

  }
}
