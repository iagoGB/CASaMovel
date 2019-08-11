import { AuthUser } from './../models/models';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private authUser: AuthUser = {
    email: "",
    senha: ""
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(user: AuthUser){
    console.log("Dados que estão sendo enviados para o servidor: "+ user.email, "\n"+ user.senha);
    this.authService.login(user).subscribe(
      data => {
        console.log("Autenticação bem sucedida. \n Token de acesso: "+ data.token);
        this.authService.saveToken(data.token).then;
      },
      erro => console.error(erro) 
    );
  }
}
