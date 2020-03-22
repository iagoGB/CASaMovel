import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/models/models';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private key_value: string;
  private url: string = `${environment.API}/usuario`;
  private username_value: string;
  
  constructor( 
    private httpClient: HttpClient,
    private storage: Storage,
    private alertService: AlertService
  ) {}
    
  async getToken() {
    this.key_value = await this.storage.get('Authorization');
    console.log(" get key value: "+ this.key_value);
  }

  async getUsername(){
    this.username_value = await this.storage.get('Username');
  }
  
  nullToken (){
    this.key_value = null;
    this.username_value = null;
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

  loadUser( ): Observable<HttpResponse<User>> {
    console.log(`${this.url}/email/${this.username_value}`);
    return this.httpClient.get<User>(`${this.url}/email/${this.username_value}`,
    { headers: new HttpHeaders().set('Authorization',this.key_value), observe: 'response'});
  }
}
  