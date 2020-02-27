import { TopHome } from './../../../Models/home/top-home';
import { HomeEveniment } from './../../../Models/home/home-eveniment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalVarService } from 'src/app/services/global-var.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  baseUrl: string;
  constructor(private http: HttpClient,
              private globalVarService: GlobalVarService) {
    this.baseUrl = '/api/home';
  }

  GetEvenimente(idUtilizator: number, minValue: number, maxValue: number){

    let params = new HttpParams();
    params = params.append('min_cost_total', minValue.toString());
    params = params.append('max_cost_total', maxValue.toString());

    return this.http.get<HomeEveniment[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/get-evenimente/" + idUtilizator,
      {
        params: params
      }
    );
  }

  GetTopTipEvenimente(idUtilizator: number, minimEvenimente: number){

    let params = new HttpParams();
    params = params.append('minim_evenimente', minimEvenimente.toString());

    return this.http.get<TopHome[]>(
      this.globalVarService.globalUrl + this.baseUrl + "/get-top-tip-evenimente/" + idUtilizator,
      {
        params: params
      }
    );
  }

}
