import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/services/http.service';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from './../../models/models';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public authState = new BehaviorSubject(false);
  private url: string = "http://localhost:3000/users";
  
  constructor (
    private http: HttpClient,
    private storage: Storage,
    private platform : Platform
  ) { 
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  login( /*user: AuthUser*/){
    /*console.log(user);
    return this.http.post(this.url,user);*/
    return this.storage.set(TOKEN_KEY,'Bear 123456').then( res => {
      this.authState.next(true);
    });
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
