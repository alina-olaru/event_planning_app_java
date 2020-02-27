import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { Locatie } from 'src/app/Models/admin/locatie';

@Injectable({
  providedIn: 'root'
})
export class LocatieService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/locatie';
  }

  GetLocatie(): Observable<Locatie[]> {

    return this.http.get<Locatie[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteLocatie(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddLocatie(locatie: Locatie): Observable<Locatie>{

    return this.http.post<Locatie>(
      this.globalVarService.globalUrl + this.baseUrl,
      locatie
    );
  }

  UpdateLocatie(locatie: Locatie, id: number): Observable<Locatie>{
    return this.http.put<Locatie>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      locatie
    );
  }
}
