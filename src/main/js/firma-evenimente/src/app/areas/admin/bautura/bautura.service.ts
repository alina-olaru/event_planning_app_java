import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { Bautura } from 'src/app/Models/admin/bautura';

@Injectable({
  providedIn: 'root'
})
export class BauturaService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/bautura';
  }

  GetBautura(): Observable<Bautura[]> {

    return this.http.get<Bautura[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteBautura(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddBautura(bautura: Bautura): Observable<Bautura>{

    return this.http.post<Bautura>(
      this.globalVarService.globalUrl + this.baseUrl,
      bautura
    );
  }

  UpdateBautura(bautura: Bautura, id: number): Observable<Bautura>{
    return this.http.put<Bautura>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      bautura
    );
  }
}
