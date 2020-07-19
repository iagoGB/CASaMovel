import { Injectable } from '@angular/core';
import { Palestrante } from 'src/app/models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  constructor( private http: HttpClient ) { }

  getAll():Observable<Palestrante[]>{
    return this.http.get<Palestrante[]>(`${environment.API}/palestrante`);
  }

  save(form: FormGroup ):Observable<any> {
    const image = form.get('foto').value as File;
    let formData: FormData = new FormData();
    let header = new HttpHeaders();
    formData.append('nome',form.get('nome').value);
    formData.append('descricao',form.get('descricao').value);
    formData.append('imagem', image, image.name);
    // return from ( Promise.all([ this.getTokenValue(), this.userService.getUsernamePromise() ]))
    // .pipe( mergeMap ( (result) => {
        // return this.http.post(
        //   `${this.url}/${eventId}/upload`, 
        //   formData ,
        //   { headers: new HttpHeaders( { 'Authorization': result[0]  }) }
        // )
        // const request = new HttpRequest('POST', `${this.url}/${eventId}/upload`,)
    // }));
    formData.forEach(value => console.log(value));
    return this.http.post(`${environment.API}/palestrante`,formData, { headers: header } );
  }
}
