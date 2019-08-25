import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme/theme.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isContrast: boolean = false;
  constructor(
    private theme: ThemeService,
    private authService: AuthService, 
  ) { }

  ngOnInit() {}

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
