import { AuthService } from './../services/auth/auth.service';

import { Component } from '@angular/core';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isContrast: boolean = false;

  constructor(private authService: AuthService, private theme: ThemeService){

  }
  
  changeTheme(){
    this.isContrast = !this.isContrast;
    if (this.isContrast){
      this.enableHighContrast();
    } else{
      this.enableDefault();
    }
  }


  enableDefault(){
    this.theme.enableDefault();
  }

  enableHighContrast(){
   this.theme.enableHighContrast();
  }

  logout(){
    this.authService.logout();
  }
}
