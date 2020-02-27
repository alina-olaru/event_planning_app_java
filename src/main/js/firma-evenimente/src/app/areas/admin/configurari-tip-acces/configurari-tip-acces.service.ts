import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { ConfigurariTipAcces } from 'src/app/Models/admin/configurari-tip-acces';

@Injectable({
  providedIn: 'root'
})
export class ConfigurariTipAccesService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/configurariTipAcces';
  }

  GetConfigurariTipAcces(): Observable<ConfigurariTipAcces[]> {

    return this.http.get<ConfigurariTipAcces[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteConfigurariTipAcces(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddConfigurariTipAcces(configurariTipAcces: ConfigurariTipAcces): Observable<ConfigurariTipAcces>{

    return this.http.post<ConfigurariTipAcces>(
      this.globalVarService.globalUrl + this.baseUrl,
      configurariTipAcces
    );
  }

  UpdateConfigurariTipAcces(configurariTipAcces: ConfigurariTipAcces, id: number): Observable<ConfigurariTipAcces>{
    return this.http.put<ConfigurariTipAcces>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      configurariTipAcces
    );
  }
}
