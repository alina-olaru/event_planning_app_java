import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipMedia } from 'src/app/Models/admin/tip-media';

@Injectable({
  providedIn: 'root'
})
export class TipMediaService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipMedia';
  }

  GetTipMedia(): Observable<TipMedia[]> {

    return this.http.get<TipMedia[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipMedia(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipMedia(tipMedia: TipMedia): Observable<TipMedia>{

    return this.http.post<TipMedia>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipMedia
    );
  }

  UpdateTipMedia(tipMedia: TipMedia, id: number): Observable<TipMedia>{
    return this.http.put<TipMedia>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      tipMedia
    );
  }
}
