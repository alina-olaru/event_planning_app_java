import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { ComponentaMeniu } from 'src/app/Models/admin/componenta-meniu';

@Injectable({
  providedIn: 'root'
})
export class ComponentaMeniuService {


  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/componentaMeniu';
  }

  GetComponentaMeniu(): Observable<ComponentaMeniu[]> {

    return this.http.get<ComponentaMeniu[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteComponentaMeniu(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddComponentaMeniu(componentaMeniu: ComponentaMeniu): Observable<ComponentaMeniu>{

    return this.http.post<ComponentaMeniu>(
      this.globalVarService.globalUrl + this.baseUrl,
      componentaMeniu
    );
  }

  UpdateComponentaMeniu(componentaMeniu: ComponentaMeniu, id: number): Observable<ComponentaMeniu>{
    return this.http.put<ComponentaMeniu>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      componentaMeniu
    );
  }
}
