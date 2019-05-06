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

  getEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.url+this.events);
  }

  createEvent(newEvent: Event){
    return this.http.post(this.url+this.events,newEvent).pipe(take(1));
  }
 

}
