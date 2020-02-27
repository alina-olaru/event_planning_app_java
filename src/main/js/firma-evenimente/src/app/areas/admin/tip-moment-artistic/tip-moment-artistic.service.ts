import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipMomentArtistic } from 'src/app/Models/admin/tip-moment-artistic';

@Injectable({
  providedIn: 'root'
})
export class TipMomentArtisticService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipMomentArtistic';
  }

  GetTipMomentArtistic(): Observable<TipMomentArtistic[]> {

    return this.http.get<TipMomentArtistic[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipMomentArtistic(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipMomentArtistic(tipMomentArtistic: TipMomentArtistic): Observable<TipMomentArtistic>{

    return this.http.post<TipMomentArtistic>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipMomentArtistic
    );
  }

  UpdateTipMomentArtistic(tipMomentArtistic: TipMomentArtistic, id: number): Observable<TipMomentArtistic>{
    return this.http.put<TipMomentArtistic>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      tipMomentArtistic
    );
  }
}
