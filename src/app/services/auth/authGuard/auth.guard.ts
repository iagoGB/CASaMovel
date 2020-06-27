import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { AlertService, ToastColor } from '../../alert/alert.service';
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
    let expectedRole: any = route.data.role;
    let userRole: string = null;
    console.log('Role necessária: ' + expectedRole);
    if (this.authService.isAuth()) {
      return this.authService.checkRole().then(
        data => {
          const isArray: boolean = Array.isArray(expectedRole);
          if (!isArray){

            if (data === expectedRole) {
              return true;
            } else {
              this.alertService.presentToast('Usuário não possui autorização para acesso!',ToastColor.DAN);
              return this.router.parseUrl('/login');
            }

          } else {
            let array: Array<boolean> = expectedRole.map( expected => this.isAuthorized(data, expected));
            if (array.includes(true))
              return true;
          }
        }
      )
    } else {
      this.alertService.presentToast('Você não está logado!',ToastColor.DAN);
      return this.router.parseUrl('/login');
    }
  }

  isAuthorized(actualRole: string, expectedRole: string){
      return actualRole === expectedRole ? true: false
  }
}
