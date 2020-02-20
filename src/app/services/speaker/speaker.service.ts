import { Injectable } from '@angular/core';
import { Palestrante } from 'src/app/models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  constructor( private http: HttpClient ) { }

  getAll():Observable<Palestrante[]>{
    return this.http.get<Palestrante[]>(`${environment.API}/palestrante`);
  }
}
