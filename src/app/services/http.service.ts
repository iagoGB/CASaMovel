import { Event } from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url: string = "http://localhost:3000";
  private events: string = "/events";

  constructor(private http: HttpClient) {
    
  };

  loadByID(id){
    return this.http.get(this.url+this.events+"/"+id).pipe(take(1));
  }

  getEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.url+this.events);
  }

  // Requisição para o servidor criar novo registro
  createEvent(newEvent: Event){
    return this.http.post(this.url+this.events,newEvent).pipe(take(1));
    //pipe take 1 Faz a requisição apenas uma única vez e encerra o observable automaticamente
  }
  
  // Requisição para o servidor atualizar registro
  updateEvent(toUpdateEvent: Event) {
    return this.http.put(this.url+this.events+'/'+toUpdateEvent.id,toUpdateEvent).pipe(take(1));
    //pipe take 1 - Faz a requisição apenas uma única vez e encerra o observable automaticamente
  }

  
 

}
