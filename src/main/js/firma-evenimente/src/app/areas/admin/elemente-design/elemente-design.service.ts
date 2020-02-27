import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { ElementeDesign } from 'src/app/Models/admin/elemente-design';

@Injectable({
  providedIn: 'root'
})
export class ElementeDesignService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/elementeDesign';
  }

  GetElementeDesign(): Observable<ElementeDesign[]> {

    return this.http.get<ElementeDesign[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteElementeDesign(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddElementeDesign(elementeDesign: ElementeDesign): Observable<ElementeDesign>{

    return this.http.post<ElementeDesign>(
      this.globalVarService.globalUrl + this.baseUrl,
      elementeDesign
    );
  }

  UpdateElementeDesign(elementeDesign: ElementeDesign, id: number): Observable<ElementeDesign>{
    return this.http.put<ElementeDesign>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      elementeDesign
    );
  }
}
