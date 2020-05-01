import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/models';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserNotTakenValidatorService {

  constructor( private userService: UserService ) { }

  checkUsernameTaken() {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap(username =>{
          return this.userService.checkUsermailIsTaken(username);
        }))
        .pipe(map((httpResp: HttpResponse<User> ) => {
          console.log("Chamoustes");
          console.log(httpResp.body);
          return httpResp.body ? { usernameTaken: true } : null
        }))
        .pipe(first());
    }
  }
}
