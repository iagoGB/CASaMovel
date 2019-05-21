import { Event } from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  private url: string = "http://localhost:8050";
  private events: string = "/events";
  private _refreshNeeded: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {
    
  };

  loadByID(event_id):any {
    return this.http.get(this.url+this.events+"/"+event_id).pipe(take(1));
  }

  //Retorna a variavel responsável por fazer o refresh
  getEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.url+this.events);
  }

  // Requisição para o servidor criar novo registro
  createEvent(newEvent: Event){
    console.log(newEvent);
    return this.http.post(this.url+this.events,newEvent)
    .pipe(
      take(1),
      tap(() => {
          this._refreshNeeded.next();
      })
    );
    //pipe take 1 Faz a requisição apenas uma única vez e encerra o observable automaticamente
  }

  refreshNeeded(): Subject<any> {
    return this._refreshNeeded;
  }
  
  // Requisição para o servidor atualizar registro
  updateEvent(toUpdateEvent: Event) {
    return this.http.put(this.url+this.events+'/'+toUpdateEvent.event_id,toUpdateEvent)
    .pipe(
      take(1),
      tap(() => {
          this._refreshNeeded.next();
      })
    );
    //pipe take 1 - Faz a requisição apenas uma única vez e encerra o observable automaticamente
  }

  // Requisição para o servidor deletar registro
  removeEvent(toDeleteEvent: Event){
    return this.http.delete(this.url+this.events+'/'+toDeleteEvent.event_id)
    .pipe(
      take(1),
      tap (
        () => {
          this._refreshNeeded.next();
        }
      )
    );
    //pipe take 1 - Faz a requisição apenas uma única vez e encerra o observable automaticamente
  }
 

}
