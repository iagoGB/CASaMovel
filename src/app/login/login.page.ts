import { AuthUser } from './../models/models';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private authUser: AuthUser = new AuthUser();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(/*user: AuthUser*/){
    this.authService.login();
    /*
    this.authService.Login(user).subscribe();
    console.log(user); */
  }
}
