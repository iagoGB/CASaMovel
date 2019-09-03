import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/models';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private h = new HttpHeaders();
  private key_value: string;
  private url: string = "http://localhost:9999/usuario";

  constructor( 
    private httpClient: HttpClient, 
    private authService: AuthService,
    private storage: Storage,
    private alertService: AlertService
  ) { }

  async getToken() {
    this.key_value = await this.storage.get('Authorization');
    console.log(" get key value: "+ this.key_value);
  }

  nullToken (){
    this.key_value = null;
    this.h = null;
  }

  createUser(newUser: User){
      return this.httpClient.post(this.url,newUser,{ headers: new HttpHeaders().set('Authorization',this.key_value) });
  }
    /*
    var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');
      headers.append('Authorization', )
      console.log(headers);
    return this.httpClient.post(this.url,newUser,{ headers: }); */
  
}
