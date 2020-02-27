import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Observable } from 'rxjs';
import { Media } from 'src/app/Models/admin/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/media';
  }

  GetMedia(): Observable<Media[]> {

    return this.http.get<Media[]>(
      this.globalVarService.globalUrl + this.baseUrl
    );

  }

  DeleteMedia(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + '/' + id
    );
  }

  AddMedia(media: Media): Observable<Media>{

    return this.http.post<Media>(
      this.globalVarService.globalUrl + this.baseUrl,
      media
    );
  }

  UpdateMedia(media: Media, id: number): Observable<Media>{
    return this.http.put<Media>(
      this.globalVarService.globalUrl + this.baseUrl + "/" + id,
      media
    );
  }
}
