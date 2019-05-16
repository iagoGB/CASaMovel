import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from './../../models/models';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url: string = "http://localhost:3000/users";
  
  constructor( private http: HttpClient) { }

  Login( user: AuthUser){
    console.log(user);
    return this.http.post(this.url,user);
  }
  
  

}
