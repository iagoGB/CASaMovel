import { Event } from '../../models/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Storage } from "@ionic/storage";

import { Observable, Subject, from } from 'rxjs';
import { take, tap, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class EventService {

  private url: string = `${environment.API}/evento`;
  private key_value: string;
  private _refreshNeeded: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    
  };

  async getToken() {
    this.key_value = await this.storage.get('Authorization');
  }

  getTokenValue(): Promise<string> {
    return this.storage.get('Authorization');
  }

  setHeaders(value: string ): HttpHeaders {
    return new HttpHeaders().set('Authorization',value);
  }

  getHttpOptions(token: string, observe = 'response'): Object {
    let httpOptions;
    return  httpOptions = {
      headers: this.setHeaders(token),
      observe: observe
    }
  }

  nullToken (){
    this.key_value = null;
  }

  refreshNeeded(): Subject<any> {
    return this._refreshNeeded;
  }

  loadByID(event_id):Observable<HttpResponse<Event>> {
    // return this.http.get<Event>(`${this.url}/${event_id}`, { headers: new HttpHeaders().set('Authorization',this.key_value), observe: 'response' }).pipe(take(1));
    return from (this.getTokenValue()).pipe( mergeMap((token) => {
      return this.http.get<Event>(`${this.url}/${event_id}`, { headers: this.setHeaders(token), observe: 'response' }).pipe(take(1))
    }));
  }

  //Retorna a variavel responsável por fazer o refresh
  getEvents():Observable<HttpResponse<Event[]>>{
    return from (this.getTokenValue()).pipe( mergeMap((token) => { 
      return this.http.get<Event[]>(`${this.url}`, { headers: this.setHeaders(token), observe:'response' });
    }));
  }

  // Requisição para o servidor criar novo registro
  createEvent(newEvent: Event): Observable<HttpResponse<Event>>{
    return from (this.getTokenValue()).pipe( mergeMap ( (token) => {
      return this.http.post<Event>(`${this.url}`, newEvent, {  headers: this.setHeaders(token) , observe: 'response' });
    }));
    // .pipe(
    //   take(1),
    //   tap(() => {
    //       this._refreshNeeded.next();
    //   })
    // );
    //pipe take 1 Faz a requisição apenas uma única vez e encerra o observable automaticamente
  }
  
  // Requisição para o servidor atualizar registro
  updateEvent(toUpdateEvent: Event) {
    return this.http.put(`${this.url}/${toUpdateEvent.id}`,toUpdateEvent,  { headers: this.setHeaders(this.key_value) })
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
    return this.http.delete(`${this.url}/${toDeleteEvent.id}`, { headers:  this.setHeaders(this.key_value) })
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
  
  // subscribeEvent(){
  //   this.http.post(`${this.url}/${event.id}?${id}`, { headers:  this.setHeaders(this.key_value) });
  // }

}
