import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }

  getAll():Observable<Categoria[]>{
    return this.http.get<Categoria[]>("http://localhost:9999/categoria");
  }
}
