import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {

  public globalUrl: string = "http://localhost:8080";
  constructor() { }
}
