import { TitleServiceModel } from './../../../Models/admin/title-service-model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private _titleSubject: Subject<TitleServiceModel> = new Subject();
  constructor() {
    this._titleSubject.next({
      icon: '',
      title: ''
    });
  }

  get titleSubject() {
    return this._titleSubject;
  }

  setTitle(icon: string, title: string) {
    this._titleSubject.next({ icon, title }as TitleServiceModel);
  }

  setTitleModel(model: TitleServiceModel) {
    this._titleSubject.next(model);
  }

}
