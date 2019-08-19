import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AlertService } from '../../alert/alert.service';
import { throws } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot) {
    let expectedRole: string = route.data.role;
    let userRole: string = null;
    console.log('Role necessária: ' + expectedRole);
    if (this.authService.isAuth()) {
      return this.authService.checkRole().then(
        data => {
          if (data === expectedRole) {
            return true;
          } else {
            this.alertService.presentToast('Usuário não possui autorização para acesso!', 'danger');
            return this.router.parseUrl('/login');
          }
        }
      )
    } else {
      this.alertService.presentToast('Você não está logado!', 'danger');
      return this.router.parseUrl('/login');
    }
  }
}
