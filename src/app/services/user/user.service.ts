import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/models';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:9999/usuario";
  constructor( 
    private httpClient: HttpClient, 
    private authService: AuthService,
    private storage: Storage,
    private alertService: AlertService
     ) { }

  createUser(newUser: User){
    return this.storage.get('Authorization').then(
      value => {
        var headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');
        headers.append('Authorization', value );
        console.log('header ' + value);
        return this.httpClient.post(this.url,newUser,{ headers: headers }).subscribe(
          good => {return 'Usuario criado ' + good},
          er =>{ return 'Erro ao criar usuário '+ er;}
        ); 
      },
      err => { console.log(err); return err }
    )
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
}
