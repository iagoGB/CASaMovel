import { AuthUser } from './../models/models';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth/auth.service';
import { AlertService } from '../services/alert/alert.service';
import { Router } from '@angular/router';



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

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(user: AuthUser){
    console.log("Dados que estão sendo enviados para o servidor: "+ user.email, "\n"+ user.senha);
    this.authService.login(user).subscribe(
      data => {
        console.log("Autenticação bem sucedida. \n Token de acesso: "+ data.token + '\n Role: '+data.role);
        this.authService.saveToken(data.token, data.role).then( () => 
        {
          if (data.role && data.role === 'USER'){
            this.router.navigate(['tabs/tabs/tab1']);
          } else if (data.role && data.role === 'ADMIN'){
            this.router.navigate(['admin-dashboard']);
          } else {
            this.router.navigate(['login']);
          }
        })
      },
      erro => this.alertService.presentToast(erro.message, 'danger')
    );
  }
}
