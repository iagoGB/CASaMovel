import { Injectable } from '@angular/core';

import { HttpClient,HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthUser, AuthResponse } from './../../models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY: string = 'Authorization';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public authState = new BehaviorSubject(false);
  private url: string = "http://localhost:9999/login";
  
  constructor (
    private http: HttpClient,
    private storage: Storage,
    private platform : Platform
  ) { 
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  login( user: AuthUser ):Observable<AuthResponse>{
    var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
      console.log(headers);
    return this.http.post<AuthResponse>(this.url,user,{headers: headers });
    /*Funcional
    return this.storage.set(TOKEN_KEY,'Bear 123456').then( res => {
      this.authState.next(true);
    });*/
  }

  saveToken(TOKEN){
    return this.storage.set(TOKEN_KEY,TOKEN).then(
      res => this.authState.next(true)
    );
  }

  logout(){
    return this.storage.remove(TOKEN_KEY).then( res => {
      this.authState.next(false);
    });
  }

  isAuth(){
    return this.authState.value;
  }

  checkToken(){
    return this.storage.get(TOKEN_KEY).then( res => {
      if (res) {
        this.authState.next(true);
      }
    });
  }
  
  

}
