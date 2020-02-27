import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { SubTipEveniment } from 'src/app/Models/admin/sub-tip-eveniment';

@Injectable({
  providedIn: 'root'
})
export class SubTipEvenimentService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/subTipEveniment';
  }

  GetSubTipEveniment(): Observable<SubTipEveniment[]> {

    return this.http.get<SubTipEveniment[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteSubTipEveniment(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddSubTipEveniment(subTipEveniment: SubTipEveniment): Observable<SubTipEveniment>{

    return this.http.post<SubTipEveniment>(
      this.globalVarService.globalUrl + this.baseUrl,
      subTipEveniment
    );
  }

  UpdateSubTipEveniment(subTipEveniment: SubTipEveniment, id: number): Observable<SubTipEveniment>{
    return this.http.put<SubTipEveniment>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      subTipEveniment
    );
  }
}
