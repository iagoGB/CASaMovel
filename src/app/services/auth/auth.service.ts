import { Injectable } from '@angular/core';

import { HttpClient,HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthUser, AuthResponse } from './../../models/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const TOKEN_KEY: string = 'Authorization';
const ROLE_KEY: string = 'Role';
// Para proposito de desenvolvimento apenas
const TOKEN_VALUE: string = 'Bearer xyz1234';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //Variável para propósitos de desenvolvimento
  private _user: Observable<any>;
  public authState = new BehaviorSubject(false);
  
  constructor (
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private platform : Platform
  ) { 
    this.platform.ready().then(() => {

      this.checkToken();
      this.loadUser();
    });
    
    //Para fins de desenvolvimento 
    this._user = this.authState.asObservable();
   
  }

  login( user: AuthUser ):Observable<AuthResponse>{
    //Montando cabeçalho para requisição
    var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
      console.log(headers);
    //Consultando os dados no servidor
    return this.http.post<AuthResponse>(`${environment.API}/login`,user,{ headers: headers });

    //Para propósito de desenvolvimento apenas - SIMULANDO BACK END
    let localUser = null;
    let email = user.email;
    let senha = user.senha; 

    // if ( user.email ==='admin'&& user.senha ==='abcd1234'){
    //   localUser = { token: TOKEN_VALUE,user: email, role:'ADMIN'}
    // } else if(user.email ==='user'&& user.senha ==='abcd1234') {
    //   localUser = { token: TOKEN_VALUE+'1234', user:email, role:'USER'}
    // } else {
    //   throw new Error('Usuário ou senha inválidos! \n Tente novamente');
    // }

    this.authState.next(localUser);
    return of(localUser);

    /*Funcional
    return this.storage.set(TOKEN_KEY,'Bear 123456').then( res => {
      this.authState.next(true);
    });*/
  }

  //Para saber se o usuário está ou não logado ao refresh
  loadUser(){
    this.storage.get(TOKEN_KEY).then( data => {
      if(data){
        this.authState.next(data);
      } else {
        this.authState.next(false);
      }
    })
  }

  saveToken(TOKEN: String,ROLE: String){
    this.saveRole(ROLE);
    console.log("Save Token"+ TOKEN);
    return this.storage.set(TOKEN_KEY,TOKEN).then(
      res => this.authState.next(true)
    );
  }

  saveRole(ROLE: String){
    console.log("Save Role: "+ROLE);
    return this.storage.set(ROLE_KEY, ROLE);
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

  checkRole():Promise<string>{
    let role: string;
    return this.storage.get(ROLE_KEY).then(
      data => {if (data){
        role = data;
        return role;
      }
    }
    )
  };

  async logout(){
    await this.storage.remove(ROLE_KEY);
    await this.storage.remove(TOKEN_KEY);
    this.authState.next(null);
    this.router.navigate(['login']);
  }
  
  

}
