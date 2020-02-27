import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { TipServireMeniu } from 'src/app/Models/admin/tip-servire-meniu';

@Injectable({
  providedIn: 'root'
})
export class TipServireMeniuService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/tipServireMeniu';
  }

  GetTipServireMeniu(): Observable<TipServireMeniu[]> {

    return this.http.get<TipServireMeniu[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteTipServireMeniu(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddTipServireMeniu(tipServireMeniu: TipServireMeniu): Observable<TipServireMeniu>{

    return this.http.post<TipServireMeniu>(
      this.globalVarService.globalUrl + this.baseUrl,
      tipServireMeniu
    );
  }

  UpdateTipServireMeniu(tipServireMeniu: TipServireMeniu, id: number): Observable<TipServireMeniu>{
    return this.http.put<TipServireMeniu>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      tipServireMeniu
    );
  }
}
