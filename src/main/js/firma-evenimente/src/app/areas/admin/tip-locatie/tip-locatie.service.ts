import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipLocatie } from 'src/app/Models/admin/tip-locatie';

@Injectable({
  providedIn: 'root'
})
export class TipLocatieService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipLocatie';
  }

  GetTipLocatie(): Observable<TipLocatie[]> {

    return this.http.get<TipLocatie[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipLocatie(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipLocatie(tipLocatie: TipLocatie): Observable<TipLocatie>{

    return this.http.post<TipLocatie>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipLocatie
    );
  }

  UpdateTipLocatie(tipLocatie: TipLocatie, id: number): Observable<TipLocatie>{
    return this.http.put<TipLocatie>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      tipLocatie
    );
  }
}
