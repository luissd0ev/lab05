import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TiendaOnlineService {

  
  private subjectUpdate = new Subject<any>();

  
  getActualizarServicio(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }


  setActualizaServicio(esActualizado: boolean) {
    this.subjectUpdate.next(esActualizado);
  }
}