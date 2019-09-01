import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:9999/usuario";
  constructor( private httpClient: HttpClient ) { }

  createUser(newUser: User){
    return this.httpClient.post(this.url,newUser);
  }
}
