import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { MomenteArtistice } from 'src/app/Models/admin/momente-artistice';

@Injectable({
  providedIn: 'root'
})
export class MomenteArtisticeService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/momenteArtistice';
  }

  GetMomenteArtistice(): Observable<MomenteArtistice[]> {

    return this.http.get<MomenteArtistice[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteMomenteArtistice(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddMomenteArtistice(momenteArtistice: MomenteArtistice): Observable<MomenteArtistice>{

    return this.http.post<MomenteArtistice>(
      this.globalVarService.globalUrl + this.baseUrl,
      momenteArtistice
    );
  }

  UpdateMomenteArtistice(momenteArtistice: MomenteArtistice, id: number): Observable<MomenteArtistice>{
    return this.http.put<MomenteArtistice>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      momenteArtistice
    );
  }
}
