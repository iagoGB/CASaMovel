import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/models/models';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private key_value: string;
  private url: string = `${environment.API}/usuario`;
  
  constructor( 
    private httpClient: HttpClient,
    private storage: Storage,
  ) {}

  getUsernamePromise(): Promise<string> {
    return this.storage.get('Username');
  }
 
  getTokenPromise(): Promise<string> {
    return this.storage.get('Authorization');
  }
    
  async getToken() {
    this.key_value = await this.storage.get('Authorization');
  }

  getUsername(): Observable<string> {
    return from (this.getUsernamePromise()).pipe( mergeMap ((value: string) =>{
      return value;
    }));
  }
  
  nullToken (){
    this.key_value = null;
    // this.username_value = null;
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
    return from ( Promise.all([this.getUsernamePromise(), this.getTokenPromise()]) )
    .pipe( mergeMap ((result) => {
      return this.httpClient.get<User>(`${this.url}/email/${result[0]}`,
        { headers: new HttpHeaders().set('Authorization',result[1]), observe: 'response'});
    }));
  }
}
  