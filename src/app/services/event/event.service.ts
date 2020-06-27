import { Event } from '../../models/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Storage } from "@ionic/storage";

import { Observable, Subject, from } from 'rxjs';
import { take, tap, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { formatDate } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class EventService {

  private url: string = `${environment.API}/evento`;
  private key_value: string;
  private _refreshNeeded: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private storage: Storage
  ) {
    
  };

  getDatas(): Observable<string[]>{
    return from ( Promise.all([ this.getTokenValue(), this.userService.getUsernamePromise() ]));
  }
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

  updateImageEvent(eventId: number, file: File){
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return from ( Promise.all([ this.getTokenValue(), this.userService.getUsernamePromise() ]))
    .pipe( mergeMap ( (result) => {
        return this.http.post(
          `${this.url}/${eventId}/upload`, 
          formData ,
          { headers: new HttpHeaders( { 'Authorization': result[0]  }) }
        )
        // const request = new HttpRequest('POST', `${this.url}/${eventId}/upload`,)
    }));
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
  
  subscribeToEvent(id: number) : Observable<HttpResponse<any>>{
    //                              Result 0                  Result 1
    return from ( Promise.all([ this.getTokenValue(), this.userService.getUsernamePromise() ]))
    .pipe( mergeMap ( (result) => {
      console.log("Resultado do promisse all: "+ result);
      return this.http.put<Event>(
        `${this.url}/${id}/inscricao`,
        // Username único,     id do evento
        // { username: result[1], eventoid: id } , 
        {},
        { headers: this.setHeaders(result[0]) , observe: 'response', params: { username: result[1] }, responseType:'json'}
      );
    }));
  }

  unsubscribeToEvent(id: number) : Observable<HttpResponse<any>>{
    //                              Result 0                  Result 1
    return this.getDatas()
    .pipe( mergeMap ( (result) => {
      return this.http.put<Event>(
        `${this.url}/${id}/remover-inscricao`,
        // Username único,     id do evento
        {},
        { headers: this.setHeaders(result[0]) , observe: 'response', params: { username: result[1] }, responseType:'json'}
      );
    }));
  }

  registerPresence(qrcode: string): Observable<HttpResponse<any>>{
    // QRCode sempre sera formado por uma string aleatória separado do id do evento 
    // exemplo: XXyZ20-10
    let qrcoderesult = qrcode.split("-");
    return this.getDatas()
    .pipe( mergeMap ( (result) => {
      return this.http.put<Event>(
        `${this.url}/${qrcoderesult[1]}/registro-presenca`,
        // Username único,     id do evento
        { keyword: qrcoderesult[0], username: result[1] },
        { headers: this.setHeaders(result[0]) , observe: 'response', params: { username: result[1] }, responseType:'json'}
      );
    }));
  }
  
}
