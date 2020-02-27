import { AddEvenimentRaspuns } from './../../../Models/home/add-eveniment-raspuns';
import { AddEveniment } from './../../../Models/home/add-eveniment';
import { ConfigurariTipAcces } from './../../../Models/admin/configurari-tip-acces';
import { TipAcces } from './../../../Models/admin/tip-acces';
import { TipMeniu } from './../../../Models/admin/tip-meniu';
import { TipServireMeniu } from './../../../Models/admin/tip-servire-meniu';
import { Media } from './../../../Models/admin/media';
import { TipMedia } from './../../../Models/admin/tip-media';
import { TipMomentArtistic } from './../../../Models/admin/tip-moment-artistic';
import { MomenteArtistice } from './../../../Models/admin/momente-artistice';
import { Bautura } from './../../../Models/admin/bautura';
import { SubLocatie } from './../../../Models/admin/sub-locatie';
import { TipLocatie } from './../../../Models/admin/tip-locatie';
import { SubTipEveniment } from './../../../Models/admin/sub-tip-eveniment';
import { TipEveniment } from './../../../Models/admin/tip-eveniment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';
import { Locatie } from 'src/app/Models/admin/locatie';
import { ElementeDesign } from 'src/app/Models/admin/elemente-design';

@Injectable({
  providedIn: 'root'
})
export class NewEventService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/wizard';
  }

  CheckValidDates(data_inceput: Date, data_sfarsit: Date){

    let params = new HttpParams();
    params = params.append('data_inceput', data_inceput.toDateString());
    params = params.append('data_sfarsit', data_sfarsit.toDateString());

    return this.http.get<boolean>(
      this.globalVarService.globalUrl + this.baseUrl + "/checkdays", {
        params: params
      }
    );
  }

  GetTipEvenimente(){
    return this.http.get<TipEveniment[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/tip-evenimente"
    );
  }

  GetSubTipEvenimente(idTipEveniment: number){
    return this.http.get<SubTipEveniment[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/sub-tip-evenimente/" + idTipEveniment
    );
  }

  GetTipLocatie(idSubTipEveniment: number){
    return this.http.get<TipLocatie[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/tip-locatie/" + idSubTipEveniment
    );
  }

  GetSubLocatie(idTipLocatie: number){
    return this.http.get<SubLocatie[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/sub-locatie/" + idTipLocatie
    );
  }

  GetLocatie(idSubLocatie: number){
    return this.http.get<Locatie[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/locatie/" + idSubLocatie
    );
  }

  GetBautura(){
    return this.http.get<Bautura[]>(
      this.globalVarService.globalUrl + "/api/bautura"
    );
  }

  GetElementeDesign(){
    return this.http.get<ElementeDesign[]>(
      this.globalVarService.globalUrl + "/api/elementeDesign"
    );
  }

  GetTipMomentArtistic(){
    return this.http.get<TipMomentArtistic[]>(
      this.globalVarService.globalUrl + "/api/tipMomentArtistic"
    );
  }

  GetMomenteArtistice(){
    return this.http.get<MomenteArtistice[]>(
      this.globalVarService.globalUrl + "/api/momenteArtistice"
    );
  }

  GetTipMedia(){
    return this.http.get<TipMedia[]>(
      this.globalVarService.globalUrl + "/api/tipMedia"
    );
  }

  GetMedia(){
    return this.http.get<Media[]>(
      this.globalVarService.globalUrl + "/api/media"
    );
  }

  GetTipServireMeniu(){
    return this.http.get<TipServireMeniu[]>(
      this.globalVarService.globalUrl + "/api/tipServireMeniu"
    );
  }

  GetTipMeniu(){
    return this.http.get<TipMeniu[]>(
      this.globalVarService.globalUrl + "/api/tipMeniu"
    );
  }

  GetTipAcces(idSubEveniment: number){
    return this.http.get<TipAcces[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/tip-acces/" + idSubEveniment
    );
  }

  GetConfigurariTipAcces(){
    return this.http.get<ConfigurariTipAcces[]>(
      this.globalVarService.globalUrl + "/api/configurariTipAcces"
    );
  }

  AddEveniment(addEveniment: AddEveniment){
    return this.http.post<AddEvenimentRaspuns>(
      this.globalVarService.globalUrl + this.baseUrl + "/add-eveniment",
      addEveniment
    )
  }

}
