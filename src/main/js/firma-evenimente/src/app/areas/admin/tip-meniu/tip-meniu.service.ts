import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipMeniu } from 'src/app/Models/admin/tip-meniu';

@Injectable({
  providedIn: 'root'
})
export class TipMeniuService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipMeniu';
  }

  GetTipMeniu(): Observable<TipMeniu[]> {

    return this.http.get<TipMeniu[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipMeniu(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipMeniu(tipMeniu: TipMeniu): Observable<TipMeniu>{

    return this.http.post<TipMeniu>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipMeniu
    );
  }

  UpdateTipMeniu(tipMeniu: TipMeniu, id: number): Observable<TipMeniu>{
    return this.http.put<TipMeniu>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      tipMeniu
    );
  }
}
