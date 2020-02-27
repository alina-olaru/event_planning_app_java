import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { SubLocatie } from 'src/app/Models/admin/sub-locatie';

@Injectable({
  providedIn: 'root'
})
export class SubLocatieService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/subLocatie';
  }

  GetSubLocatie(): Observable<SubLocatie[]> {

    return this.http.get<SubLocatie[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteSubLocatie(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddSubLocatie(subLocatie: SubLocatie): Observable<SubLocatie>{

    return this.http.post<SubLocatie>(
      this.globalVarService.globalUrl + this.baseUrl,
      subLocatie
    );
  }

  UpdateSubLocatie(subLocatie: SubLocatie, id: number): Observable<SubLocatie>{
    return this.http.put<SubLocatie>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      subLocatie
    );
  }
}
