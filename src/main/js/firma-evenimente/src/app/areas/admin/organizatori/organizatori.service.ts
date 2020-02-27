import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { Organizatori } from 'src/app/Models/admin/organizatori';

@Injectable({
  providedIn: 'root'
})
export class OrganizatoriService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/organizatori';
  }

  GetOrganizatori(): Observable<Organizatori[]> {

    return this.http.get<Organizatori[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteOrganizatori(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddOrganizatori(organizatori: Organizatori): Observable<Organizatori>{

    return this.http.post<Organizatori>(
      this.globalVarService.globalUrl + this.baseUrl,
      organizatori
    );
  }

  UpdateOrganizatori(organizatori: Organizatori, id: number): Observable<Organizatori>{
    return this.http.put<Organizatori>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      organizatori
    );
  }
}
