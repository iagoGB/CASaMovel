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

  getUserData() : Observable<string[]> {
    return from ( Promise.all ( [this.getUsernamePromise(), this.getTokenPromise()] ) );
  }
  
  nullToken (){
    this.key_value = null;
  }
  
  createUser(newUser: User){
    return this.httpClient.post(this.url,newUser,{ headers: new HttpHeaders().set('Authorization',this.key_value) });
  }

  loadUser( ): Observable<HttpResponse<User>> {
    return this.getUserData()
    .pipe( mergeMap ((result) => {
      return this.httpClient.get<User>(`${this.url}/email`,
        { headers: new HttpHeaders().set('Authorization',result[1]), observe: 'response', params: { username: result[0] } });
    }));
  }

  checkUsermailIsTaken(targetEmail : string): Observable<HttpResponse<User>> {
    return this.getUserData()
    .pipe( mergeMap((result) => {
      return this.httpClient.get<User>(`${this.url}/email`,
        { headers: new HttpHeaders().set('Authorization',result[1]), observe: 'response', params: { username: targetEmail } });
    }));
  } 
}
  