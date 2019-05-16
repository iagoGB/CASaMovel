import { AuthService } from './../services/auth/auth.service';
import { HttpService } from './../services/http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private authService: AuthService){

  }

  logout(){
    this.authService.logout();
  }
}
